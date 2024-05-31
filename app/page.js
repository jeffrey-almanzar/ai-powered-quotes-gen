'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"

import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import Breadcrumbs from "./components/Breadcrumbs";
import BarChart from "./components/BarChart";

const links = [
  {
    text: 'Dashboard',
    link: '/',
    isActive: true,
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
  },
];

const breadcrumbs = [
  {
    name: 'Dashboard',
    link: '/'
  },
];

export default function HomePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/api/quotes'),
      fetch('/api/products'),
    ]).then(async ([quotesResponse, productsResponse]) => {
      const quotes = await quotesResponse.json();
      const products = await productsResponse.json();

      setData({
        quotes: Object.values(quotes),
        products: Object.values(products),
      });
    })
  }, []);

  const { quotes = [], products = [] } = data;

  const drafts = quotes.filter(data => data.status === 'Draft');
  const sent = quotes.filter(data => data.status === 'Sent');

  const quotesChartData = {
    labels: ['Drafts', 'Sent'],
    datasets: [
      {
        data: [drafts.length, sent.length],
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productsChartData = {
    labels: products.map(product => product.type),
    datasets: [
      {
        data: products.reduce((acc, curr) => {
          return acc.concat(curr.forms.length);
        }, []),
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      }
    ]
  }

  const productChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: true,
        text: 'Products & Forms',
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      }
    }
  };

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
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                Quotes
              </CardTitle>
              <CardDescription>
                <div className="max-w-xl">
                  <BarChart data={quotesChartData} />
                </div>
                <Link className="underline pt-3 inline-block" href="/quotes">View all quotes</Link>
              </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
          </Card>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>
                Products
              </CardTitle>
              <CardDescription>
                <div className="max-w-3xl">
                  <BarChart options={productChartOptions} data={productsChartData} />
                </div>
                <Link className="underline pt-3 inline-block" href="/products">View all products & forms</Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
