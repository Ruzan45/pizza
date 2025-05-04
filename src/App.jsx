import React from 'react';
import { Routes, Route } from "react-router";

import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './components/NotFoundBlock';

export const SearchContext = React.createContext();

export default function App() {
  const [searchValue, setSearchValue] = React.useState('');


  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">

        <Header />
        <div className="content">

          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>



  );
}
