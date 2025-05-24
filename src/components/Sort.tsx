import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, selectSort } from '../redux/slises/filterSlice.js'//redux



type sortItem = { //объект типов для TS
  name: string;
  sortValue: string;
  order: string;
};
const sortList: sortItem[] = [ // [] - указываем что это массив объектов
  {
    name: 'популярности',
    sortValue: 'raiting',
    order: 'desc'
  }, {
    name: 'цене-убыванию',
    sortValue: 'price',
    order: 'desc'
  },
  {
    name: 'цене-возрастанию',
    sortValue: 'price',
    order: 'asc'
  }, {
    name: 'алфавиту',
    sortValue: 'title',
    order: 'asc'
  }
]
export function Sort() {
  const dispach = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLSpanElement>(null); //аналог this в JQ//null для TS
  const [opened,
    setOpened] = React.useState(false);

  const ClickSort = (obj: sortItem) => {
    dispach(setSort(obj)) //передаём в редакс объект
    setOpened(false); //закрываем окно сортировки при выборе сортировки
  }

  React.useEffect(() => { //закрываем окошко при  клике вне него
    let handleClickOutside = (event: MouseEvent) => {
      if (event.target !== sortRef.current) { //если в event не содержится span тогда закрывавем окошко
        setOpened(false);
      }
    }
    document.body.addEventListener('click', handleClickOutside);
    return () => { //для useEffect return выполняет действие внутри себя при unMount
      document.body.removeEventListener('click', handleClickOutside);// удаляем функцию handleClickOutside при закрытии окна Sort
    }
  }, []);

  return (
    <div className="sort">{/* sortRef ссылка на div */}
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C" />
        </svg>
        <b>Сортировка по:</b>
        <span ref={sortRef} onClick={() => setOpened(!opened)}>{sort.name}</span>
      </div>

      {opened && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                className={sort.name === obj.name
                  ? 'active'
                  : ''}
                onClick={() => (ClickSort(obj))}>{obj.name}</li>
            ))}
          </ul>
        </div>
      )
      }

    </div>
  );
}