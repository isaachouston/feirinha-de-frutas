import React, { useState } from 'react'
import { useCart } from '../../contexts/cart/CartContext';
import { IFruitsResponse } from '../../interfaces/IFruits'
import { formatPrice } from '../../util/format';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

export const UseCartFruit = () => {

    const { cart, removeFruit, updateFruitAmount } = useCart();

    const [basketFruit, setBasketFruit] = useState<IFruitsResponse[]>([])


    const cartFormatted = cart.map(fruit => ({
        ...fruit,
        priceFormatted: formatPrice(fruit.price),
        subTotal: formatPrice(fruit.price * fruit.amount)
    }))
    const total =
        formatPrice(
            cart.reduce((sumTotal, fruit) => {
                return sumTotal + fruit.price * fruit.amount;
            }, 0)
        )

    function handleFruitIncrement(fruit: IFruitsResponse) {
        updateFruitAmount({ fruitId: fruit.id, amount: fruit.amount + 1 })
    }

    function handleFruitDecrement(fruit: IFruitsResponse) {
        updateFruitAmount({ fruitId: fruit.id, amount: fruit.amount - 1 })
    }

    function handleRemoveFruit(fruitId: number) {
        removeFruit(fruitId)
    }

    const onSubmitBuyFruits = () => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        const reportTitle: any = [
            {
                text: 'Sacola de compra',
                fontSize: 15,
                bold: true,
                margin: [15, 20, 0, 45],
            }
        ]

        const dados = cart.map(item => {
            return [
                { text: item.title, fontSize: 9, margin: [0, 2, 0, 2] },
                { text: formatPrice(item.price), fontSize: 9, margin: [0, 2, 0, 2] },
            ]
        })

        const details: any = [{
            table: {
                headerRows: 1,
                widths: ['*', '*'],
                body: [
                    [
                        { text: 'Fruta', style: 'tableHeader', fontSize: 10 },
                        { text: 'Preço', style: 'tableHeader', fontSize: 10 },
                    ],
                    ...dados,
                    [
                        { text: 'Total' },
                        { text: total }
                    ]
                ]

            },
            layout: 'lightHorizontalLines'

        }]


        const doc: any = {
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],
            header: [reportTitle],
            content: [details]

        }

        pdfMake.createPdf(doc).download();

    }



    return (
        {
            cartFormatted,
            total,
            handleFruitIncrement,
            handleFruitDecrement,
            handleRemoveFruit,
            onSubmitBuyFruits
        }
    )
}
