'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Home,
  Package,
  TextQuote,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import BarChart from "./components/BarChart";
import Layout from "./components/Layout";

import { API_PRODUCTS_ENDPOINT, API_QUOTES_ENDPOINT } from "@/lib/constants";

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
      fetch(API_QUOTES_ENDPOINT),
      fetch(API_PRODUCTS_ENDPOINT),
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
    <Layout links={links} breadcrumbs={breadcrumbs}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>
            Quotes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl">
            <BarChart data={quotesChartData} />
          </div>
          <Link className="underline pt-3 inline-block" href="/quotes">View all quotes</Link>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>
            Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-3xl">
            <BarChart options={productChartOptions} data={productsChartData} />
          </div>
          <Link className="underline pt-3 inline-block" href="/products">View all products & forms</Link>
        </CardContent>
      </Card>
    </Layout>
  );
}
