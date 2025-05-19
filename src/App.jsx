import React from 'react';
import { Routes, Route } from "react-router";

import './scss/app.scss';

import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './components/NotFoundBlock';
import MainLayout from './components/layouts/MainLayout';

export default function App() {

  return (
    //<SearchContext.Provider value={{ searchValue, setSearchValue }}>
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:pizzaId" element={<FullPizza />} />{/* через : указывается параметр для useParams, который будет приниматься из адресной строки*/}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>



  );
}
