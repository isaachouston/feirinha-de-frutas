import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IFruitsResponse } from '../../interfaces/IFruits';
import { api } from '../../services/api/Api';


interface UpdateFruitAmount {
    fruitId: number;
    amount: number;
}

interface CartContextData {
    cart: IFruitsResponse[];
    addFruit: (fruitId: number) => Promise<void>;
    removeFruit: (fruitId: number) => void;
    updateFruitAmount: ({ fruitId, amount }: UpdateFruitAmount) => void;
}


const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<IFruitsResponse[]>(() => {
        const storagedCart = localStorage.getItem('@FeirinhaFrutas:cart')

        if (storagedCart) {
            return JSON.parse(storagedCart);
        }

        return [];
    });

    const addFruit = async (fruitId: number) => {
        try {
            const updateCart = [...cart];
            const fruitExists = updateCart.find(fruit => fruit.id === fruitId);

            const stock = await api.get(`/stock/${fruitId}`)

            const stockAmount = stock.data.amount;

            const currentAmount = fruitExists ? fruitExists.amount : 0;

            const amount = currentAmount + 1;


            if (amount > stockAmount) {
                toast.error('Quantidade de fruta sem estoque')
                return
            }

            if (fruitExists) {
                fruitExists.amount = amount;
            } else {
                const fruit = await api.get(`/fruits/${fruitId}`);
                const newFruit = {
                    ...fruit.data,
                    amount: 1
                }
                updateCart.push(newFruit);
            }
            setCart(updateCart);
            localStorage.setItem('@FeirinhaFrutas:cart', JSON.stringify(updateCart))

        } catch {
            toast.error('Erro em adicinar fruta')
        }
    };

    const removeFruit = (fruitId: number) => {
        try {

            const updateCart = [...cart];
            const fruitIndex = updateCart.findIndex(fruit => fruit.id === fruitId);

            if (fruitIndex >= 0) {
                updateCart.splice(fruitIndex, 1);
                setCart(updateCart);
                localStorage.setItem('@FeirinhaFrutas:cart', JSON.stringify(updateCart))

            } else {
                throw Error();

            }

        } catch {
            toast.error('Erro em remover fruta')
        }
    };

    const updateFruitAmount = async ({
        fruitId,
        amount,
    }: UpdateFruitAmount) => {
        try {
            if (amount <= 0) {
                return;
            }
            const stock = await api.get(`/stock/${fruitId}`)
            const stockAmount = stock.data.amount;

            if (amount > stockAmount) {
                toast.error('Fruta fora de estoque');
                return
            }

            const updateCart = [...cart];
            const fruitExists = updateCart.find(fruit => fruit.id === fruitId);

            if (fruitExists) {
                fruitExists.amount = amount;
                setCart(updateCart);
                localStorage.setItem('@FeirinhaFrutas:cart', JSON.stringify(updateCart))
            } else {
                throw Error();
            }

        } catch {
            toast.error('Erro na alteração de quantidade da fruta')
        }
    };

    return (
        <CartContext.Provider
            value={{ cart, addFruit, removeFruit, updateFruitAmount }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    return context;
}
