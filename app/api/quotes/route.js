import { NextResponse } from 'next/server';
import { ref, push, set, remove, update } from "firebase/database";

import { fetchAllRecords } from '../../../lib/firebase/getRecords';
import { database } from '@/lib/firebase/appClient';

const LIST_NAME = 'quotes';


export async function GET() {
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

export async function PATCH(request) {
    const updatedRecord = await request.json();
    const dbRef = ref(database, `${LIST_NAME}/${updatedRecord.id}`);
    await update(dbRef, updatedRecord);
    return NextResponse.json({ message: 'Record updated successfully' });
}

export async function DELETE(request) {
    const { id } = await request.json();
    const dbRef = ref(database, `${LIST_NAME}/${id}`);
    await remove(dbRef);
    return NextResponse.json({ message: 'Record deleted successfully' });
}