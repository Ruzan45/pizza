import React from 'react'


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/pagination/Pagination';


export default function Home({ searchValue }) {


    const [pizza, setPizza] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true) // скелетон при загрузке. 
    const [categoryId, setCategoryId] = React.useState(0); // выбор категории
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedSort, setSelectedSort] = React.useState({
        name: 'популярности',
        sortProperty: 'raiting'
    })

    const order = selectedSort.sortProperty.includes('-') ? '&order=desc' : '&order=asc';//необязательно делать так. 
    const replaceMinus = selectedSort.sortProperty.replace('-', '');                    //Можно просисать ASC DESC 
    const category = categoryId > 0 ? `&category=${categoryId}` : '';                    //прописать в объекте в компоненте Sort
    //const and = categoryId > 0 ? '&' : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    React.useEffect(() => {
        setIsLoading(true);// говорим что нужно показать скелетон при загрузке. 
        /* fetch(`https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?${category}
        &sortBy=${replaceMinus}
        &order=${order}`) */
        fetch('https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?page=' + currentPage + '&limit=5' + category +
            '&sortBy=' + replaceMinus + order + search)
            .then((res) => res.json()).then((arr) => {
                arr == "Not found" ? console.log('Ничего не найдено') : setPizza(arr); //
                setIsLoading(false);// скелетон отключить. 
            });
        window.scrollTo(0, 100);
    }, [categoryId, selectedSort, searchValue, currentPage]); /* в квадратных скобках [] - указывается переменная useState, при изменении которой должен сработать UseEffect
  [] - если никаких переменных в скобках нет, то выполнить только при первой загрузке*/
    const pizzas = pizza.map(obj => <PizzaBlock key={obj.id} {...obj} />);///...obj spread оператор, т е мы весь обект отправили в компонент PizzaBlock

    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);// (_, index) - _ пустой массив 
    return (
        <><div className="container">
            <div className="content__top">
                { }
                <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
                <Sort sortId={selectedSort} onClickSort={(id) => setSelectedSort(id)} sortName={selectedSort} />
            </div>
            <h2 className="content__title">{searchValue ? 'Поиск: ' + searchValue : 'Все пиццы'}</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : pizzas
                }
            </div>

            <Pagination onChangePage={(number) => setCurrentPage(number)} />

        </div>
        </>
    )
}