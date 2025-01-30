import React from 'react';
import { Routes, Route } from "react-router";


import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './components/NotFoundBlock';



import './scss/app.scss';


/* import pizzas from './assets/pizzas.json';
 */


export default function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (

    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">

        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>



  );
}
