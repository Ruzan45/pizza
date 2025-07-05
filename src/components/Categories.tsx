import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks'

import { useSelector, useDispatch } from 'react-redux';//redux
import { setCategoryId } from '../redux/slises/filterSlice'//redux

type CategoriesPrors = { //типизируем пропсы
  value: number;
  onChangeCategory: (i: number) => void;
};
const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'//5
];

const Categories: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filterSlice.categoryId);
  const dispach = useDispatch();

  const onClickCategory = React.useCallback((id: number) => {
    dispach(setCategoryId(id))
  }, []);

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