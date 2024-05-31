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

export default function ListerHeader(props) {
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