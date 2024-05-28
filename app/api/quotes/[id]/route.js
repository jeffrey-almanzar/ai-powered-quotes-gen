import { NextResponse } from 'next/server';
import { ref, push, set, remove, update } from "firebase/database";

import { fetchAllRecords, fetchRecordById } from '../../../../lib/firebase/getRecords';
import { database } from '@/lib/firebase/appClient';

const LIST_NAME = 'quotes';


export async function GET(request, { params }) {
    const { id } = params;
    const data = await fetchRecordById(LIST_NAME, id);
    return NextResponse.json(data);
}

export async function PATCH(request, { params }) {
    const { id } = params;

    const updatedRecord = await request.json();
    const dbRef = ref(database, `${LIST_NAME}/${id}`);
    await update(dbRef, updatedRecord);
    return NextResponse.json({ message: 'Record updated successfully' });
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const dbRef = ref(database, `${LIST_NAME}/${id}`);
    await remove(dbRef);
    return NextResponse.json({ message: 'Record deleted successfully' });
}