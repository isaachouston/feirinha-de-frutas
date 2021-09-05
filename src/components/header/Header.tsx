import React from 'react'
import styles from './Header.module.scss';
import Logo from '../../assets/feirinha-de-frutas.png'
import { MdShoppingBasket } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';

export const Header = () => {

    const { cart } = useCart()

    const cartSize = cart.length;
    
    return (
        <div id={styles.Header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">
                        <h1>Feirinha de <span>Frutas</span></h1>
                        <img src={Logo} alt="Feirinha de frutas" />
                    </Link>
                </div>
                <div className={styles.cart}>
                    <Link to="/cart">
                    <div>
                        <strong>Minha cesta</strong>
                        <span>
                            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
                        </span>
                    </div>
                    <MdShoppingBasket size={36} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
