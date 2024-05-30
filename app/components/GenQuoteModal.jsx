'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import Image from "next/image"
import Link from "next/link"
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    TextQuote,
    Users2,
    ServerCog,
    LoaderCircle,
    GanttChart,
    CircleX,
    CircleCheck,
} from "lucide-react"

import { Badge } from "@/app/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Input } from "@/app/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/app/components/ui/tooltip"

import { Textarea } from "@/app/components/ui/textarea"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"

import getAIAnswer, { IS_RFQ_PROMPT, GET_RFQ_DETAILS_PROMPT, QUOTE_GEN_PROMPT, getAIGeneratedQuote } from "@/lib/openai";
import { createProducts } from "@/lib/firebase/seed";

const NOT_STARTED = 'no-started';
const PENDING_STATE = 'pending';
const ERROR_STATE = 'error';
const COMPLETED_STATE = 'completed';

const steps = [
    {
        label: "Checking if it's a valid RFQ",
        state: PENDING_STATE

    },
    {
        label: "Extracting RFQ details",
        state: NOT_STARTED

    },
    {
        label: "Checking inventory",
        state: NOT_STARTED
    },
    {
        label: "Generating quote",
        state: NOT_STARTED
    },
];

const iconsPerState = {
    [NOT_STARTED]: GanttChart,
    [PENDING_STATE]: LoaderCircle,
    [ERROR_STATE]: CircleX,
    [COMPLETED_STATE]: CircleCheck,
}



export default function GenQuoteModal(props) {
    const { onClick } = props;

    const [quoteGenSteps, setQuoteGenSteps] = useState(steps);
    const [textareaValue, setTextAreaValue] = useState("");
    const [quoteGenState, setQuoteGenState] = useState({
        isWorking: false,
        message: '',
    });
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(Object.values(data));
            });
    }, []);

    async function generateQuote(event) {
        try {
            setQuoteGenState({
                isWorking: true,
                message: 'Generating quote...',
            })
            const isAValidRequestForQuote = await getAIAnswer(IS_RFQ_PROMPT, textareaValue);
            setQuoteGenSteps(prevSteps => (
                updateStepAtIndex(prevSteps, 0, COMPLETED_STATE)
            ));

            if (isAValidRequestForQuote === 'Yes') {
                const rfqDetails = await getAIAnswer(GET_RFQ_DETAILS_PROMPT, textareaValue);
                const jsonRequestForQuoteDetails = JSON.parse(rfqDetails);

                setQuoteGenSteps(prevSteps => (
                    updateStepAtIndex(prevSteps, 1, COMPLETED_STATE)
                ));
                setQuoteGenSteps(prevSteps => (
                    updateStepAtIndex(prevSteps, 2, COMPLETED_STATE) // inventory is already fetched
                ));

                const generatedQuoteEmail = await getAIGeneratedQuote(QUOTE_GEN_PROMPT, rfqDetails, JSON.stringify(products));

                setQuoteGenSteps(prevSteps => (
                    updateStepAtIndex(prevSteps, 3, COMPLETED_STATE)
                ));

                const date = new Date();
                const contactPerson = jsonRequestForQuoteDetails['Contact Person'] || {};
                const company = jsonRequestForQuoteDetails['Company Name'];

                const newQuote = {
                    name: `Quote for ${company}`,
                    status: 'Draft',
                    aiGeneratedEmail: generatedQuoteEmail,
                    originalEmail: textareaValue,
                    emailSubject: `Quotation for RFQ - ${company}`,
                    contactPersonName: contactPerson['Name'],
                    contactPersonEmail: contactPerson['Email'],
                    company,
                    date,
                };

                const response = await fetch('/api/quotes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newQuote),
                });

                const createdQuote = await response.json();

                if (createdQuote.id) {
                    router.push(`/quotes/${createdQuote.id}`);
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    const { isWorking, message } = quoteGenState;

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Generate Quote
                    </span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-4xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Generate quote from RFQ email</AlertDialogTitle>
                </AlertDialogHeader>
                <div>
                    {isWorking
                        ? (
                            <ul>
                                {quoteGenSteps.map(({ label, state }, index) => {
                                    const Icon = iconsPerState[state];
                                    return (
                                        <li className="flex" key={`quote-step-${index}`}>
                                            <Icon />
                                            <span>{label}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                        : (
                            <Textarea
                                value={textareaValue}
                                onChange={(event) => setTextAreaValue(event.target.value)}
                                className="min-h-36"
                                placeholder="Paste the RFQ email content here" />
                        )
                    }
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={(e) => generateQuote(e)} size="sm" className="h-8 gap-1">
                        <TextQuote className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Generate Quote
                        </span>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function updateStepAtIndex(steps, index, state) {
    const step = steps[index];
    step.state = state;

    const stepsCopy = [...steps];
    stepsCopy.splice(index, 1, step);

    if (index !== steps.length - 1) {
        const nextStep = steps[index + 1];
        nextStep.state = PENDING_STATE;
        stepsCopy.splice(index + 1, 1, nextStep);
    }

    return stepsCopy;
}