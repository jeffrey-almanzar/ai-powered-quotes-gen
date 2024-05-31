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

export default function MobileNav(props) {
    return (
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
    )
}