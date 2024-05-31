'use client';

import { useEffect, useState } from "react";

import {
    Home,
    Package,
    TextQuote,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

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

import { API_PRODUCTS_ENDPOINT } from "@/lib/constants";

import Layout from "../components/Layout";

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
        fetch(API_PRODUCTS_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setProducts(Object.values(data));
            })
    }, []);

    return (
        <Layout links={links} breadcrumbs={breadcrumbs}>
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
        </Layout>
    );
}
