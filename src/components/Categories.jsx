import React from 'react';

import { useSelector, useDispatch } from 'react-redux';//redux
import { setCategoryId } from '../redux/slises/filterSlice.js'//redux


function Categories() {
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const dispach = useDispatch();
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];
  const onClickCategory = (id) => {
    dispach(setCategoryId(id))
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li key={i} onClick={() => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}>{value}</li>
        ))
        }
      </ul>
    </div>
  );
}

export default Categories;