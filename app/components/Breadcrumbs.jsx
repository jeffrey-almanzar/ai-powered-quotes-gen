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


export default function Breadcrumbs({ breadcrumbs }) {
    return (
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
    )
}