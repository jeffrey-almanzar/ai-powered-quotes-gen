import { NextResponse } from 'next/server';
import { ref, push, set, remove, update } from "firebase/database";

import { fetchAllRecords, fetchRecordById } from '../../../lib/firebase/getRecords';
import { database } from '@/lib/firebase/appClient';

const LIST_NAME = 'products';


export async function GET(request) {
    const data = await fetchAllRecords(LIST_NAME);
    return NextResponse.json(data);
}

