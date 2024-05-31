'use client';

import _ from 'lodash';
import React, { useState, useEffect } from "react";

import {
    Home,
    Package,
    TextQuote,
} from "lucide-react"

import {
    Card,
    CardContent
} from "@/app/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs"

import GenQuoteModal from "../components/GenQuoteModal";
import ListerBody from '../components/ListerBody';
import ListerHeader from '../components/ListerHeader';
import Layout from '../components/Layout';

import { API_QUOTES_ENDPOINT } from '@/lib/constants';

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
        fetch(API_QUOTES_ENDPOINT)
            .then(response => response.json())
            .then(data => {
                setQuotes(Object.values(data));
            });
    }, []);

    const onDelete = (id) => {
        fetch(`${API_QUOTES_ENDPOINT}/${id}`, { method: 'DELETE' })
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
        <Layout links={links} breadcrumbs={breadcrumbs}>
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
                        {quotesToDisplay.length
                            ? <ListerBody
                                columns={columns}
                                list={quotesToDisplay}
                                onDelete={onDelete}
                            />
                            : (
                                <CardContent>
                                    <p>No records to display</p>
                                </CardContent>
                            )
                        }

                    </Card>
                </TabsContent>
                <TabsContent value={SENT_STATUS}>
                    <Card x-chunk="dashboard-06-chunk-0">
                        <ListerHeader
                            onChange={debouncedOnChange}
                            heading="Quotes"
                            description="Search sent quotes"
                        />
                        {quotesToDisplay.length
                            ? (<ListerBody
                                columns={columns}
                                list={quotesToDisplay}
                                onDelete={onDelete}
                            />
                            )
                            : (
                                <CardContent>
                                    <p>No records to display</p>
                                </CardContent>
                            )
                        }
                    </Card>
                </TabsContent>
            </Tabs>
        </Layout>
    );
}

