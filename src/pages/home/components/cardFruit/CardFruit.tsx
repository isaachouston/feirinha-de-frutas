import React from 'react';
import styles from './CardFruit.module.scss';
import { MdAddShoppingCart } from 'react-icons/md';
import FruitLogo from '../../../../components/fruitLogo/FruitLogo';
import { formatPrice } from '../../../../util/format';
import {  IFruitsResponse } from '../../../../interfaces/IFruits';
import { CartItemsAmount } from '../../UseHome';


interface ICardFruitProps {
    fruitList: IFruitsResponse[];
    handleAddFruit: (id: number) => void;
    cartItemsAmount: CartItemsAmount;
}

export const CardFruit: React.FC<ICardFruitProps> = ({
    fruitList,
    handleAddFruit,
    cartItemsAmount
}) => {

    const rederFruit = (fruit: IFruitsResponse, key: number) => (
        <div key={key} className={styles.fruits}>
            <img src={fruit.image} alt="Imagem da fruta" />
            <strong>{fruit.title}</strong>
            <span>{formatPrice(fruit.price)}</span>
            <button
                type="button"
                onClick={() => handleAddFruit(fruit.id)}
            >
                <div >
                    <MdAddShoppingCart size={16} color="var(--on-primary)" />
                    {cartItemsAmount && cartItemsAmount[fruit.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
            </button>
        </div>
    )

    return (
        <div id={styles.CardFruit}>
            {fruitList ? (
                !fruitList?.length ? (
                    <h3>Nenhuma Fruta encontrada!</h3>
                ) : (
                    fruitList?.map(rederFruit)
                )
            ) : (
                <FruitLogo width={300} />
            )}
        </div>
    )
}
