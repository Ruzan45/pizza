import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { Provider } from 'react-redux'

import App from './App';

import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      < App />
    </Provider>
  </BrowserRouter>
);