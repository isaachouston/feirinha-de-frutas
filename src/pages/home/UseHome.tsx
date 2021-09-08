import { AutocompleteChangeReason } from '@material-ui/lab';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/cart/CartContext';
import { useUi } from '../../contexts/ui/UiContext';
import { IFruitsResponse } from '../../interfaces/IFruits';
import { api } from '../../services/api/Api';


export interface CartItemsAmount {
    [key: number]: number;
}

export const UseHome = () => {

    const [fruits, setFruits] = useState<IFruitsResponse[]>([]);
    const [filteredFruits, setFilterFruits] = useState<IFruitsResponse[]>([]);
    const { setLoading } = useUi();
    const { addFruit, cart } = useCart();

    const cartItemsAmount = cart?.reduce((sumAmount, fruit) => {
        const newAmount = { ...sumAmount };
        newAmount[fruit.id] = fruit.amount;
        return newAmount;
    }, {} as CartItemsAmount)

    useEffect(() => {
        const loadFruits = async () => {
            setLoading(true)
            const { data: result } = await api.get('/fruits')
            setFruits(result)
            setFilterFruits(result)
            setLoading(false)
        }
        loadFruits();
    }, []);

    function handleAddFruit(id: number) {
        addFruit(id)
    }


    const getOptionSelected = (
        option: IFruitsResponse,
        value: IFruitsResponse
    ) => {
        return option.title === value.title;
    };

    const getOptionLabel = (option: IFruitsResponse) => option.title;

    const handleChangeFilter = (_event: React.ChangeEvent<{}>, value: string | IFruitsResponse | null, _reason: AutocompleteChangeReason) => {

        if (typeof value === "object") {
            if (value === null) {
                setFilterFruits(fruits);
            } else {
                setFilterFruits([value]);
            }
        }
        console.log('filter', value);

    };

    return (
        {
            setFruits,
            cartItemsAmount,
            handleAddFruit,
            filteredFruits,
            getOptionSelected,
            getOptionLabel,
            handleChangeFilter
        }
    )
}
