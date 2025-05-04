import React from 'react';
import qs from "qs";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';//redux
import { setCurrentPage, setFilters } from '../redux/slises/filterSlice';
import { useNavigate } from 'react-router-dom'; //useNavigate функция React routera для адресной строки

import Categories from '../components/Categories';
import { Sort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/pagination/Pagination';


export default function Home({ searchValue }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false); //переменная для того чтобы не было двойного запроса при получении данных из адр. строки
    const isMounted = React.useRef(false); //переменная для того чтобы при первом рендере не вшивались фильтры в адрес. строку

    const categoryId = useSelector((state) => state.filterSlice.categoryId);
    const sort = useSelector((state) => state.filterSlice.sort);
    const currentPage = useSelector((state) => state.filterSlice.currentPage);
    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }
    const [pizza, setPizza] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true) // скелетон при загрузке.

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
        window.scrollTo(0, 100);
        if (!isSearch.current) { //если false тогда выполняем
            setIsLoading(true);//показать скелетон при загрузке. 
            /* fetch(`https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?${category}&sortBy=${replaceMinus}&sort=${sort}`) */

            axios.get('https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?page=' +
                currentPage + '&limit=5' + (categoryId > 0 ? `&category=${categoryId}` : '') + '&sortBy=' + sort.sortValue + '&order=' + sort.order + (searchValue ? `&search=${searchValue}` : ''))
                .then((res) => {
                    setPizza(res.data);
                    setIsLoading(false);
                });
        }
        isSearch.current = false;
    }, [categoryId, sort, searchValue, currentPage]); /* в квадратных скобках [] - указывается переменная useState, при изменении которой должен сработать UseEffect, [] - если никаких переменных в скобках нет, то выполнить только при первой загрузке*/

    React.useEffect(() => {//выводим фильтры в адресную строку с помощью библиотеки QS
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                currentPage,
                sort

            })
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, searchValue, currentPage]);
    const pizzas = pizza.map(obj => <PizzaBlock key={obj.id} {...obj} />);///...obj spread оператор, т е мы весь обект отправили в компонент PizzaBlock
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);// (_, index) - _ пустой массив 
    return (
        <><div className="container">
            <div className="content__top">

                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">{searchValue ? 'Поиск: ' + searchValue : 'Все пиццы'}</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />

        </div>
        </>
    )
}