'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

import {
    Home,
    Package,
    PanelLeft,
    TextQuote,
} from "lucide-react"

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
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion";


import Breadcrumbs from "../components/Breadcrumbs";
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";

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
    },
    {
        text: 'Products',
        link: '/products',
        Icon: Package,
        isActive: true,
    },
];

const breadcrumbs = [
    {
        name: 'Dashboard',
        link: '/'
    },
    {
        name: 'Products',
        link: '/products'
    },
];

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(Object.values(data));
            })
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Nav links={links} />
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
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription className="py-4">
                                Fetched ERP products
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {products.map((product, index) => {
                                const { type, forms } = product;
                                const formColumns = [
                                    'Grade',
                                    'Name',
                                    'Quantity',
                                    'Price per unit'
                                ];

                                return (
                                    <Accordion key={index} type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>{type}</AccordionTrigger>
                                            <AccordionContent>
                                                <Table key={`table-${index}`}>
                                                    <TableHeader>
                                                        <TableRow>
                                                            {formColumns.map((columnName, index) => (
                                                                <TableHead key={`column-${index}`} className="hidden sm:table-cell">
                                                                    {columnName}
                                                                </TableHead>
                                                            ))}
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {forms.map((form, index) => {
                                                            const { grade, name, price, quantity } = form;
                                                            return (
                                                                <TableRow key={`quote-${index}`}>
                                                                    <TableCell className="hidden md:table-cell">
                                                                        {grade}
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {name}
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {price}
                                                                    </TableCell>
                                                                    <TableCell className="hidden md:table-cell">
                                                                        {quantity}
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                );
                            })}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}
