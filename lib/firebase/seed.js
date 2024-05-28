import { getDatabase, ref, push, set } from "firebase/database";

import firebaseApp from './appClient';

export default function seed() {
    // Create a new quote reference with an auto-generated id
    const db = getDatabase(firebaseApp);
    const quoteListRef = ref(db, 'quotes');
    const newPostRef = push(quoteListRef);
    set(newPostRef, {
        name: "Quote for Test Company"
    });
}