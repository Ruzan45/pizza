import axios from 'axios';
import { RootState } from '../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export const fetchPizzas = createAsyncThunk
    ('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
        const state = thunkAPI.getState() as RootState //типизировал thunkAPI
        const filterSlice = state.filterSlice; //getState() может получить данные напрямую из Редакса
        /* const { //принимаем что-то похожее на пропсы из Home} = params; */
        const { data } = await axios.get<PizzaItems[]>(
            'https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?page=' + filterSlice.currentPage + '&limit=5' + (filterSlice.categoryId > 0 ? `&category=${filterSlice.categoryId}` : '')
            + '&sortBy=' + filterSlice.sort.sortValue + '&order=' + filterSlice.sort.order + (filterSlice.searchData ? `&search=${filterSlice.searchData}` : '')
        );

        return data;

    },
    )
export type PizzaItems = {
    id: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

interface PizzaSliceState {
    items: PizzaItems[];
    status: Status;
}
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, //loading, success, error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        /* setItems(state, action: PayloadAction<PizzaItems>) { //PayloadAction для типизации action
            state.items = action.payload;
        }, */
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {//идёт отправка
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {//всё ок
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state) => {//Произошка ошибка
            state.items = [];
            state.status = Status.ERROR;
        })
    },
});

/* export const { setItems } = pizzaSlice.actions;// */

export default pizzaSlice.reducer;