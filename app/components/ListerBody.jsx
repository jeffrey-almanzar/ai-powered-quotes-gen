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

export default function ListerBody(props) {
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