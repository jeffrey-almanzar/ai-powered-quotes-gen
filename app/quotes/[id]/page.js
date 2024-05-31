'use client';
import { useState, useEffect } from "react";

import {
    Home,
    Package,
    Mails,
    Save,
    TextQuote,
} from "lucide-react"

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"

import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Toaster } from "@/app/components/ui/sonner"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/app/components/ui/accordion"

import { toast } from "sonner"


import Layout from "@/app/components/Layout";

import { API_QUOTES_ENDPOINT } from "@/lib/constants";

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
    },
];

export default function QuoteDetails(props) {
    const { params } = props;
    const quoteId = params.id;

    const [quoteData, setQuoteData] = useState({});

    useEffect(() => {
        fetch(`${API_QUOTES_ENDPOINT}/${quoteId}`)
            .then(response => response.json())
            .then(data => {
                setQuoteData(data);
            })
    }, []);

    const {
        name,
        status,
        originalEmail,
        aiGeneratedEmail,
        emailSubject,
        contactPersonName,
        contactPersonEmail,
        date,
        company,
    } = quoteData;


    const breadcrumbs = [
        {
            name: 'Dashboard',
            link: '/'
        },
        {
            name: 'Quotes',
            link: '/quotes'
        },
        {
            name,
        }
    ];

    function sendEmail() {
        /*
            - sendEmail in lib/sendgrid/index.js is actually setup to send an email.
            - however, even though the email is being sent without error, it's not being delivered
            - didn't have the change to look into it
        */
        fetch(`${API_QUOTES_ENDPOINT}/${quoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...quoteData, status: 'Sent' }),
        })
            .then(response => response.json())
            .then(data => {
                toast("Email sent");
                setQuoteData(preData => ({...preData, status: 'Sent'}));
            });
    }

    function saveChanges() {
        fetch(`${API_QUOTES_ENDPOINT}/${quoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quoteData),
        })
            .then(response => response.json())
            .then(data => {
                toast("Changes saved")
            })
    }

    return (
        <Layout links={links} breadcrumbs={breadcrumbs}>
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>
                        <div className="flex ">
                            <span className="flex items-center">
                                <span className="pr-4">{name}</span>
                                <Badge variant="secondary">{status}</Badge>
                            </span>
                            <Button onClick={() => saveChanges()} size="sm" className="h-8 gap-1 ml-auto">
                                <Save className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Save changes
                                </span>
                            </Button>

                            <Toaster position="top-center" />
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Ai Generated Quote Email</AccordionTrigger>
                            <AccordionContent>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    sendEmail();
                                }}>
                                    <label className="inline-block pb-2 text-muted-foreground">Client email</label>
                                    <Input
                                        value={contactPersonEmail}
                                        onChange={(e) => {
                                            setQuoteData(prevData => ({
                                                ...prevData,
                                                contactPersonEmail: e.target.value,
                                            }))
                                        }}
                                    />
                                    <label className="inline-block pb-2 pt-5 text-muted-foreground">Subject</label>
                                    <Input
                                        value={emailSubject}
                                        onChange={(e) => {
                                            setQuoteData(prevData => ({
                                                ...prevData,
                                                emailSubject: e.target.value,
                                            }))
                                        }}
                                    />
                                    <label className="inline-block pb-2 pt-5 text-muted-foreground">Content</label>
                                    <Textarea
                                        value={aiGeneratedEmail}
                                        onChange={(e) => {
                                            setQuoteData(prevData => ({
                                                ...prevData,
                                                aiGeneratedEmail: e.target.value,
                                            }))
                                        }}
                                        className="min-h-52"
                                    />
                                    <div className="py-5">
                                        <Button size="sm" className="h-8 gap-1">
                                            <Mails className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Send email
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Original RFQ Input</AccordionTrigger>
                            <AccordionContent>
                                <pre>{originalEmail}</pre>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </Layout>
    );
}