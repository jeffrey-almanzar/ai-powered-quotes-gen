import { getDatabase, ref, push, set } from "firebase/database";

import firebaseApp from './appClient';
import { products, quotes } from "./seeData";

export async function createQuotes() {
    const db = getDatabase(firebaseApp);
    const quoteListRef = ref(db, 'quotes');

    const promises = quotes.map(quote => {
        const newQuote = push(quoteListRef);
        return set(newQuote, { ...quote, id: newQuote.key });
    });

    await Promise.all(promises);
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