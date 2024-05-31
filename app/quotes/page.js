'use client';

import _ from 'lodash';
import React, { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import {
    Home,
    LineChart,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    TextQuote,
    ServerCog,
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
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import {
    DropdownMenu,
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
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';
import Breadcrumbs from '../components/Breadcrumbs';
import ListerBody from '../components/ListerBody';
import ListerHeader from '../components/ListerHeader';

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
    }
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

const breadcrumbs = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Quotes',
        link: '/quotes'
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
            <Nav links={links} />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="container sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <MobileNav links={links} />
                        </SheetContent>
                    </Sheet>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
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
                <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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

