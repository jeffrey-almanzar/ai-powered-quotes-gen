'use client';
import { useState, useEffect } from "react";

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
    Mails,
    Save,
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

import { Toaster } from "@/app/components/ui/sonner"

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

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import { toast } from "sonner"

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

export default function QuoteDetails(props) {
    const { params } = props;
    const quoteId = params.id;

    const [quoteData, setQuoteData] = useState({});

    useEffect(() => {
        fetch(`/api/quotes/${quoteId}`)
            .then(response => response.json())
            .then(data => {
                setQuoteData(data)
                // setTextAreaValue(data.aiGeneratedEmail || '')
            })
    }, []);

    const {
        name,
        status,
        originalEmail,
        aiGeneratedEmail,
        emailSubject,
        contactPersonName,
        contactPersonEmail,
        date,
        company,
    } = quoteData;

    function sendEmail() {
        fetch(`/api/quotes/${quoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...quoteData, status: 'Sent'}),
        })
            .then(response => response.json())
            .then(data => {
                toast("Email sent");
                //setQuoteData(preData => ({preData, status: 'Sent'}))
            })
    }

    function saveChanges() {
        fetch(`/api/quotes/${quoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quoteData),
        })
            .then(response => response.json())
            .then(data => {
                toast("Changes saved")
            })
    }

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
                                <BreadcrumbPage>{name}</BreadcrumbPage>
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
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex ">
                                    <span className="flex items-center">
                                        <span className="pr-4">{name}</span>
                                        <Badge variant="secondary">{status}</Badge>
                                    </span>
                                    <Button onClick={() => saveChanges()} size="sm" className="h-8 gap-1 ml-auto">
                                        <Save className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Save changes
                                        </span>
                                    </Button>

                                    <Toaster position="top-center" />
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Ai Generated Quote Email</AccordionTrigger>
                                    <AccordionContent>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            sendEmail();
                                        }}>
                                            <label className="inline-block pb-2 text-muted-foreground">Client email</label>
                                            <Input
                                                value={contactPersonEmail}
                                                onChange={(e) => {
                                                    setQuoteData(prevData => ({
                                                        ...prevData,
                                                        contactPersonEmail: e.target.value,
                                                    }))
                                                }}
                                            />

                                            <label className="inline-block pb-2 pt-5 text-muted-foreground">Subject</label>
                                            <Input
                                                value={emailSubject}
                                                onChange={(e) => {
                                                    setQuoteData(prevData => ({
                                                        ...prevData,
                                                        emailSubject: e.target.value,
                                                    }))
                                                }}
                                            />

                                            <label className="inline-block pb-2 pt-5 text-muted-foreground">Content</label>
                                            <Textarea
                                                value={aiGeneratedEmail}
                                                onChange={(e) => {
                                                    setQuoteData(prevData => ({
                                                        ...prevData,
                                                        aiGeneratedEmail: e.target.value,
                                                    }))
                                                }}
                                                className="min-h-52"
                                            />

                                            <div className="py-5">
                                                <Button size="sm" className="h-8 gap-1">
                                                    <Mails className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                        Send email
                                                    </span>
                                                </Button>
                                            </div>
                                        </form>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Original RFQ Input</AccordionTrigger>
                                    <AccordionContent>
                                        <pre>{originalEmail}</pre>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}