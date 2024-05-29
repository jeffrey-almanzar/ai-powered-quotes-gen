'use client';
import { useState } from "react";

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

import getAIAnswer, { IS_RFQ_PROMPT, GET_RFQ_DETAILS_PROMPT } from "@/lib/openai";

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
        label: 'In Review',
        value: 'in-review',
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

const quotes = [
    {
        date: '2023-07-12',
        name: 'Some quote name',
        client: 'Test Company',
        total: '$90,000',
    },
    {
        date: '2023-07-12',
        name: 'Some quote name',
        client: 'Test Company',
        total: '$90,000',
    },
    {
        date: '2023-07-12',
        name: 'Some quote name',
        client: 'Test Company',
        total: '$90,000',
    },
    {
        date: '2023-07-12',
        name: 'Some quote name',
        client: 'Test Company',
        total: '$90,000',
    },
    {
        date: '2023-07-12',
        name: 'Some quote name',
        client: 'Test Company',
        total: '$90,000',
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

export function GenQuoteModal(props) {
    const {
        onClick
    } = props;

    const [textareaValue, setTextAreaValue] = useState("");

    const [quoteGenState, setQuoteGenState] = useState({
        isWorking: false,
        message: '',
    });

    async function generateQuote(event) {
        try {
            const isAValidRequestForQuote = await getAIAnswer(IS_RFQ_PROMPT, textareaValue);

            if (isAValidRequestForQuote === 'Yes') {
                const rfqDetails = await getAIAnswer(GET_RFQ_DETAILS_PROMPT, textareaValue);

                // check inventory
                // generate quote
                // send email
            }

        } catch(err) {
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
                    {/* <AlertDialogDescription>
                        Paste the RFQ email content below
                    </AlertDialogDescription> */}
                </AlertDialogHeader>
                <div>
                    {isWorking 
                     ? (
                        <ul>
                            {steps.map(({label, state}, index) => {
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
<Textarea value={textareaValue} onChange={(event) => setTextAreaValue(event.target.value)} className="min-h-36" placeholder="Paste the RFQ email content here" />
                     )
                    }
                    
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* <AlertDialogAction onClick={(e) => generateQuote(e)}>Generate</AlertDialogAction> */}
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
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
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
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {shouldOpenGenQuoteModal && (
                        <p>Yes render it</p>
                    )}
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
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <File className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Export
                                    </span>
                                </Button>
                                <GenQuoteModal
                                    onClick={() => setShouldOpenGenQuoteModal(!shouldOpenGenQuoteModal)} size="sm" className="h-8 gap-1"
                                />
                            </div>
                        </div>
                        <TabsContent value="drafts">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Quotes</CardTitle>
                                    <CardDescription>
                                        <span className="inline-block pt-3">Ai generated quotes.</span>
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
                                            {quotes.map(({ date, name, client, total }, index) => (
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
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-xs text-muted-foreground">
                                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                        products
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}