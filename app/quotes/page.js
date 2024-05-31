'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import _ from 'lodash';

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
} from "@/app/components/ui/tooltip";

import GenQuoteModal from "../components/GenQuoteModal";

const SENT_STATUS = 'Sent';
const DRAFT_STATUS = 'Draft';

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
        value: DRAFT_STATUS,
    },
    {
        label: SENT_STATUS,
        value: SENT_STATUS,
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
        label: 'Contact Person'
    },
    {
        label: 'Status'
    }, 
];

const NOT_STARTED = 'no-started';
const PENDING_STATE = 'pending';
const ERROR_STATE = 'error';
const COMPLETED_STATE = 'completed';


const breadcrumbs = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Quotes',
        link: '/Quotes'
    },
];

export default function Quotes() {
    const [quotes, setQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(DRAFT_STATUS);

    useEffect(() => {
        fetch('/api/quotes')
            .then(response => response.json())
            .then(data => {
                setQuotes(Object.values(data));
            });
    }, []);

    const onDelete = (id) => {
        fetch(`/api/quotes/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id))
            });
    }

    const onChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    }

    const debouncedOnChange = _.debounce(onChange, 500);

    const quotesToDisplay = quotes.filter(quote => {
        if (!searchTerm) {
            return quote?.status === activeTab;
        }
        return quote?.status === activeTab && quote.name.toLowerCase().includes(searchTerm);
    });

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
                            {breadcrumbs.map(({ name, link }, index) => {
                                const isNotLastChild = index < breadcrumbs.length - 1;
                                return (
                                    <React.Fragment key={index} >
                                        <BreadcrumbItem>
                                            {isNotLastChild
                                                ? (
                                                    <BreadcrumbLink asChild={isNotLastChild} >
                                                        <Link href={link}>{name}</Link>
                                                    </BreadcrumbLink>
                                                )
                                                : <BreadcrumbPage>{name}</BreadcrumbPage>
                                            }
                                        </BreadcrumbItem>
                                        {isNotLastChild && <BreadcrumbSeparator />}
                                    </React.Fragment>
                                )
                            })}
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
                    <Tabs defaultValue={activeTab} onValueChange={(e) => setActiveTab(e)}>
                        <div className="flex items-center">
                            <TabsList>
                                {tabs.map(({ label, value }, index) => (
                                    <TabsTrigger key={`tab-list-${index}`} value={value}>{label}</TabsTrigger>
                                ))}
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <GenQuoteModal />
                            </div>
                        </div>
                        <TabsContent value={DRAFT_STATUS}>
                            <Card x-chunk="dashboard-06-chunk-0">
                                <ListerHeader
                                    heading="Quotes"
                                    description="Search Ai generated quotes"
                                    onChange={debouncedOnChange}
                                />
                                <ListerBody
                                    columns={columns}
                                    list={quotesToDisplay}
                                    onDelete={onDelete}
                                />
                            </Card>
                        </TabsContent>
                        <TabsContent value={SENT_STATUS}>
                            <Card x-chunk="dashboard-06-chunk-0">
                                <ListerHeader
                                    onChange={debouncedOnChange}
                                    heading="Quotes"
                                    description="Search sent quotes"
                                />
                                <ListerBody
                                    columns={columns}
                                    list={quotesToDisplay}
                                    onDelete={onDelete}
                                />
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

function ListerHeader(props) {
    const {
        heading,
        description,
        onChange,
    } = props;

    return (
        <CardHeader>
            <CardTitle>{heading}</CardTitle>
            <CardDescription className="py-4">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        onChange={(e) => onChange(e)}
                        placeholder={description}
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[536px]"
                    />
                </div>
            </CardDescription>
        </CardHeader>
    )
}

function ListerBody(props) {
    const { columns, list, onDelete } = props;
    return (
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
                    {list.map(({ id, date, name, contactPersonName, status }, index) => (
                        <TableRow key={`quote-${index}`}>
                            <TableCell className="hidden md:table-cell">
                                {date}
                            </TableCell>
                            <TableCell className="font-medium">
                                {name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {contactPersonName}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                            <Badge variant="secondary">{status}</Badge>
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
                                            <Link className="inline-block w-full" href={`/quotes/${id}`}>Edit</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => onDelete(id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    )
}
