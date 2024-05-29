import { NextResponse } from 'next/server';
import { ref, push, set, remove, update } from "firebase/database";

import { fetchAllRecords, fetchRecordById } from '../../../../lib/firebase/getRecords';
import { database } from '@/lib/firebase/appClient';

const LIST_NAME = 'products';


export async function GET(request, { params }) {
    const { id } = params;
    const data = await fetchRecordById(LIST_NAME, id);
    return NextResponse.json(data);
}
