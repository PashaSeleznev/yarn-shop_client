/*
Типы для TypeScript

- Сущности (OrderItem, Order, User, Product, CartItem, Review)
- Пропсы компонентов (ProfileProps, LoginProps, HeaderProps и т.д.)
*/

export type OrderItem = {
    id: number;
    name: string;
    color: string;
    image: string;
    price: number;
    quantity: number;
}

export type Order = {
    paymentId: string;
    amount: number;
    items: OrderItem[];
    date: Date;
    status: 'pending' | 'paid' | 'cancelled'
}

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    orders: Order[];
}

export type Product = {
    id: number;
    name: string;
    color: string;
    price: number;
    image: string;
}

export type CartItem = Product & {
    quantity: number;
}

export type ProfileProps = {
    logUser: User;
    setLogUser: (user: User) => void;
    nullUser: User;
}

export type LoginProps = {
    setLogUser: (user: User) => void;
}

export type HeaderProps = {
    logUser: User;
}

export type CatalogProps = {
    logUser: User;
}

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

export type CartProps = {
    logUser: User;
}

export type PaymentStatusCheckerProps = {
    userId: number;
    setLogUser: (user: User) => void;
} 

export type OrdersProps = {
    logUser: User;
    setLogUser: (user: User) => void;
}

export type Review = {
    id: number;
    userImage: string;
    username: string;
    rating: 1 | 2 | 3 | 4 | 5;
    text: string;
}