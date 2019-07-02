export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
}

export interface BookCartElement {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
    countCartItem: number;
}