'use client';
import { useState, useEffect } from "react";
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

const links = [
    {
        text: 'Dashboard',
        link: '/',
        Icon: Home,
    },
    {
        text: 'Quotes',
        link: '/quotes',
        Icon: TextQuote,
        isActive: true,
    },
    {
        text: 'Products',
        link: '/products',
        Icon: Package,
    },
    {
        text: 'Clients',
        link: '/clients',
        Icon: Users2,
    },
];

const tabs = [
    {
        label: 'Drafts',
        value: 'drafts',
    },
    {
        label: 'Sent',
        value: 'sent',
    },
];

const columns = [
    {
        label: 'Date'
    },
    {
        label: 'Name'
    },
    {
        label: 'Client'
    },
    {
        label: 'Total'
    },
];

const NOT_STARTED = 'no-started';
const PENDING_STATE = 'pending';
const ERROR_STATE = 'error';
const COMPLETED_STATE = 'completed';

const iconsPerState = {
    [NOT_STARTED]: GanttChart,
    [PENDING_STATE]: LoaderCircle,
    [ERROR_STATE]: CircleX,
    [COMPLETED_STATE]: CircleCheck,
}


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

function GenQuoteModal(props) {
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
                <Button onClick={onClick} size="sm" className="h-8 gap-1">
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


export default function Quotes() {
    const [shouldOpenGenQuoteModal, setShouldOpenGenQuoteModal] = useState(false);
    const [shouldOpenQuoteDetails, setShouldOpenQuoteDetails] = useState(false);
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetch('/api/quotes')
            .then(response => response.json())
            .then(data => {
                setQuotes(Object.values(data));
            });
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <ServerCog className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    {
                        links.map(({ text, link, Icon, isActive }) => (
                            <TooltipProvider key={text}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={link}
                                            className={`${isActive ? 'bg-accent' : ''} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="sr-only">{text}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">{text}</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))
                    }
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                {links.map(({ text, link, isActive, Icon }, index) => (
                                    <Link
                                        key={`mobile-nav-${index}`}
                                        href={link}
                                        className={`flex items-center gap-4 px-2.5 ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {text}
                                    </Link>
                                ))}
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Dashboard</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#">Quotes</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>All Quotes</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <Image
                                        src="/placeholder-user.jpg"
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="drafts">
                        <div className="flex items-center">
                            <TabsList>
                                {tabs.map(({ label, value }, index) => (
                                    <TabsTrigger key={`tab-list-${index}`} value={value}>{label}</TabsTrigger>
                                ))}
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 gap-1">
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Archived
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <GenQuoteModal
                                    // router={router}
                                    onClick={() => setShouldOpenGenQuoteModal(!shouldOpenGenQuoteModal)} size="sm" className="h-8 gap-1"
                                />
                            </div>
                        </div>
                        <TabsContent value="drafts">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Quotes</CardTitle>
                                    <CardDescription className="py-4">
                                        <div className="relative flex-1 md:grow-0">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search Ai generated quotes"
                                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[536px]"
                                            />
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {columns.map(({ label }, index) => (
                                                    <TableHead key={`column-${index}`} className="hidden sm:table-cell">
                                                        {label}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {quotes.map(({ id, date, name, client, total }, index) => (
                                                <TableRow key={`quote-${index}`}>
                                                    <TableCell className="hidden md:table-cell">
                                                        {date}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {name}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {client}
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        {total}
                                                    </TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Link href={`/quotes/${id}`}>Edit</Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
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