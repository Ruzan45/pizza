import React from 'react';
import qs from "qs";//используем библиотеку qs для парсинга строки
import { useSelector, useDispatch } from 'react-redux';//redux
import { selectFilter, setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import { fetchPizzas } from '../redux/slises/pizzaSlice';

import { Link, useNavigate } from 'react-router-dom'; //useNavigate функция React routera для адресной строки

import Categories from '../components/Categories';
import { Sort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/pagination/Pagination';
import Error from '../components/Error';


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false); //переменная для того чтобы не было двойного запроса при получении данных из адр. строки
    const isMounted = React.useRef(false); //переменная для того чтобы при первом рендере не вшивались фильтры в адрес. строку

    const { items, status } = useSelector(selectFilter);
    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sort = useSelector((state) => state.filterSlice.sort);
    const currentPage = useSelector((state) => state.filterSlice.currentPage);
    const searchData = useSelector((state) => state.filterSlice.searchData);


    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    React.useEffect(() => { //полуаем фильтры из адресной строки и парсим их
        if (window.location.search) { //если ы адресной строке есть что-то кроме домена
            const params = qs.parse(window.location.search.substring(1)); //используем библиотеку qs для парсинга
            /* const sort = sortList.find((obj) => obj.sort === params.sort); */
            dispatch(
                setFilters({
                    ...params,
                })
            )
            isSearch.current = true; //отмечаем что запрос уже был и больше не надо
        }
    }, []);
    React.useEffect(() => { //получаем пиццы из бэкэнда

        if (!isSearch.current) { //если false тогда выполняем
            async function getPizzas() {
                dispatch(fetchPizzas({/*  searchData, */ }));
                window.scrollTo(0, 100);
            }
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort, searchData, currentPage]); /* в квадратных скобках [] - указывается переменная useState, при изменении которой должен сработать UseEffect, [] - если никаких переменных в скобках нет, то выполнить только при первой загрузке*/

    React.useEffect(() => {//выводим фильтры в адресную строку с помощью библиотеки QS
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                currentPage,
                sort

            })
            navigate(`?${queryString}`); //выводим фильтры в адресную строку с помощью библиотеки QS navigate
        }
        isMounted.current = true;
    }, [categoryId, sort, searchData, currentPage]);
    const pizzas = items.map(obj => <Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>);///...obj spread оператор, т е мы весь обект отправили в компонент PizzaBlock
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);// (_, index) - _ пустой массив 
    return (
        <><div className="container">
            <div className="content__top">

                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">{searchData ? 'Поиск: ' + searchData : 'Все пиццы'}</h2>
            {
                status === 'error' ? (<Error />)
                    :
                    (<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>)
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />

        </div>
        </>
    )
}