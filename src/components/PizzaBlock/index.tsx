import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, CartItemSlice } from '../../redux/slises/cartSlice';
import { Link } from 'react-router';

const typeNames = ['тонкое', 'традиционное', 'домашнее']; // решение Арчакова. Статичный массив имеет точно такие же индексы, какие нам присылаются в массиве types

type PizzaBlockProps = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  id: string;
};
const PizzaBlock: React.FC<PizzaBlockProps> = ({ title, price, imageUrl, sizes, types, id }) => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.cart.items.filter(function (obj: any) { return obj.id === id })).reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0); // 0 это начальное значение sum ;

  const [activeSize, setIndexSize] = React.useState<number>(0);
  const [activeType, setType] = React.useState<number>(0);
  const onClickAdd = () => {
    const item: CartItemSlice = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
      ids: 0,
    }

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}><img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4></Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeNum, i) => (
            <li key={i} onClick={() => setType(i)} className={activeType === i ? 'active' : ''}>
              {typeNames[typeNum]}
              {/* {typeNum === 0 && 'тонкое'}
              {typeNum === 1 && 'традиционное'}
              {typeNum === 2 && 'домашнее'} -моё решение */}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((val, i) => (
            <li key={i} onClick={() => setIndexSize(i)} className={activeSize === i ? 'active' : ''}>{val} см.</li>
          ))
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price}
          ₽</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white" />
          </svg>
          <span>Добавить</span>
          {cartCount > 0 && <i>{cartCount}</i>} {/* если больше нуля, то выводим количество данного товара в корзине */}
        </button>
      </div>
    </div>
  )
};

export default PizzaBlock;