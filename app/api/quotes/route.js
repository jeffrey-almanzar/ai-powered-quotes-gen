import { NextResponse } from 'next/server';
import { ref, push, set, remove, update } from "firebase/database";

import { fetchAllRecords, fetchRecordById } from '../../../lib/firebase/getRecords';
import { database } from '@/lib/firebase/appClient';

const LIST_NAME = 'quotes';


export async function GET(request) {
    const data = await fetchAllRecords(LIST_NAME);
    return NextResponse.json(data);
}

export async function POST(request) {
    const newRecord = await request.json();
    const dbRef = ref(database, LIST_NAME);
    const newRecordRef = push(dbRef);
    await set(newRecordRef, {...newRecord, id: newRecordRef.key});
    return NextResponse.json({ message: 'Record created successfully' });
}
