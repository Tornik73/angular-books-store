export interface IBook {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
}

export interface IBookCartElement {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
    countCartItem: number;
}