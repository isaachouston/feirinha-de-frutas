import React from 'react'
import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from 'react-icons/md';
import FruitLogo from '../../components/fruitLogo/FruitLogo';
import { IFruitsResponse } from '../../interfaces/IFruits';
import styles from './Cart.module.scss'
import { UseCartFruit } from './UseCartFruit';


export const Cart = () => {

    const { cartFormatted, handleFruitDecrement, handleFruitIncrement, handleRemoveFruit, total } = UseCartFruit();

    const { onSubmitBuyFruits } = UseCartFruit()

    return (
        <div id={styles.Cart}>
            {cartFormatted ? (
                !cartFormatted.length ? (
                    <div className={styles.emptyBasket}>
                        <h2>Cesta vazia!</h2>
                    </div>
                ) : (
                    <div className={styles.container}>
                        {
                            cartFormatted.map(fruit => (
                                <div>
                                    <div>
                                        <img src={fruit.image} alt={fruit.title} />
                                    </div>
                                    <div>
                                        <strong>{fruit.title}</strong>
                                        <span>{fruit.priceFormatted}</span>
                                    </div>
                                    <div className={styles.containerAddRemove}>

                                        <button
                                            type="button"

                                            disabled={fruit.amount <= 1}
                                            onClick={() => handleFruitDecrement(fruit)}
                                        >
                                            <MdRemoveCircleOutline size={20} />
                                        </button>
                                        <input
                                            type="text"

                                            readOnly
                                            value={fruit.amount}
                                        />
                                        <button
                                            type="button"

                                            onClick={() => handleFruitIncrement(fruit)}
                                        >
                                            <MdAddCircleOutline size={20} />
                                        </button>

                                    </div>
                                    <div>
                                        <strong>{fruit.subTotal}</strong>
                                    </div>
                                    <div className={styles.buttonDelete}>
                                        <button
                                            type="button"

                                            onClick={() => handleRemoveFruit(fruit.id)}
                                        >
                                            <MdDelete size={20} />
                                        </button>
                                    </div>

                                </div>

                            ))
                        }
                        <div className={styles.footer}>
                            <button  onClick={onSubmitBuyFruits} type="button">Finalizar compra</button>

                            <div className={styles.total}>
                                <span>TOTAL:</span>
                                <strong>{total}</strong>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <FruitLogo width={300} />
            )}
        </div>
    )
}
