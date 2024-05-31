import { getDatabase, ref, push, set } from "firebase/database";

import firebaseApp from './appClient';
import { products } from "./seeData";

export default function seed() {
    // Create a new quote reference with an auto-generated id
    const db = getDatabase(firebaseApp);
    const quoteListRef = ref(db, 'quotes');
    const newPostRef = push(quoteListRef);
    set(newPostRef, {
        name: "Quote for Test Company"
    });
}

export async function createProducts() {
    const db = getDatabase(firebaseApp);
    const productListRef = ref(db, 'products');

    const promises = products.map(product => {
        const newProduct = push(productListRef);
        return set(newProduct, { ...product, id: newProduct.key });
    });

    await Promise.all(promises);
}