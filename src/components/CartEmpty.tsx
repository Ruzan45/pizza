import React from 'react'
import { Link } from 'react-router';


import cartEmptyImg from '../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая<span>😕</span></h2>
            <p>Вероятней всего, вы не заказывали ещё пиццу.<br />Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img src={cartEmptyImg} alt="Empty cart" />
            <Link className="button button--black" to="/">
                <span>Вернуться назад</span>
            </Link>
        </div>

    )
}

export default CartEmpty;