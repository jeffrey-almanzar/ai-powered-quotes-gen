'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

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

import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";

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

const SpinnerIcon = (props) => <LoaderCircle className="animate-spin w-5 mr-2" {...props} />;

const iconsPerState = {
    [NOT_STARTED]: (props) => <GanttChart className="mr-2" {...props} />,
    [PENDING_STATE]: SpinnerIcon,
    [ERROR_STATE]: (props) => <CircleX className="mr-2 w-5" {...props} />,
    [COMPLETED_STATE]: (props) => <CircleCheck className="mr-2 w-5" {...props} />,
}

export default function GenQuoteModal(props) {
    const [quoteGenSteps, setQuoteGenSteps] = useState(steps);
    const [textareaValue, setTextAreaValue] = useState("");
    const [quoteGenState, setQuoteGenState] = useState({
        isWorking: false,
        error: false,
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
                message: 'Generating quote: ',
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
                    setQuoteGenSteps(steps); // reset
                    router.push(`/quotes/${createdQuote.id}`);
                }
            } else {
                setQuoteGenState({
                    isWorking: false,
                    error: true,
                    message: 'The input is not a request for quote (RFQ). Please try again.',
                })
            }

        } catch (err) {
            console.log(err);
        }
    }

    const { isWorking, error, message } = quoteGenState;

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
                    {isWorking && (
                        <React.Fragment>
                            <p className="pb-2">{message}</p>
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
                        </React.Fragment>
                    )}
                    {error && <p className="text-red-600 pb-2">{message}</p>}
                    {!isWorking && (
                        <Textarea
                            value={textareaValue}
                            onChange={(event) => setTextAreaValue(event.target.value)}
                            className="min-h-36"
                            placeholder="Paste the RFQ email content here" />
                    )}
                </div>
                <AlertDialogFooter>
                    {!isWorking && <AlertDialogCancel className="h-8">Cancel</AlertDialogCancel>}
                    <Button onClick={(e) => !isWorking && generateQuote(e)} size="sm" className={`h-8 gap-1 ${isWorking ? 'opacity-50' : ''}`}>
                        {isWorking ? <SpinnerIcon className="animate-spin h-3.5 w-3.5" /> : <TextQuote className="h-3.5 w-3.5" />}
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