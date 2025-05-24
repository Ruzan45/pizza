import React from 'react';

import { useSelector, useDispatch } from 'react-redux';//redux
import { setCategoryId } from '../redux/slises/filterSlice.js'//redux

type CategoriesPrors = { //типизируем пропсы
  value: number;
  onChangeCategory: (i: number) => void;
};
const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'//5
];

const Categories: React.FC/* <CategoriesPrors> */ = (/* {value, onChangeCategory}*/) => {
  const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
  const dispach = useDispatch();

  const onClickCategory = (id: number) => {
    dispach(setCategoryId(id))
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li key={i} onClick={() => onClickCategory(i)}
            className={categoryId === i ? 'active' : ''}>{cat}</li>
        ))
        }
      </ul>
    </div>
  );
}

export default Categories;