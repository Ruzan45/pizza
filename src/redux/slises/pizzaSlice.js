import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
    async (params) => {
        const {
            items,
            categoryId,
            sort,
            currentPage,
            searchValue,
        } = params;
        const { data } = await axios.get(
            'https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?page=' + currentPage + '&limit=5' + (categoryId > 0 ? `&category=${categoryId}` : '')
            + '&sortBy=' + sort.sortValue + '&order=' + sort.order + (searchValue ? `&search=${searchValue}` : '')
        );
        return data;
    },
)

const initialState = {
    items: [],
    status: 'loading', //loading, success, error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {//идёт отправка
            state.status = 'loading';
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {//всё ок
            state.items = action.payload;
            state.status = 'success';
        })
        builder.addCase(fetchPizzas.rejected, (state) => {//Произошка ошибка
            state.items = [];
            state.status = 'error';
        })
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;