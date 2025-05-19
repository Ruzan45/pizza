import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const filterSlice = thunkAPI.getState().filterSlice; //getState() может получить данные напрямую из Редакса
        /* const { //принимаем что-то похожее на пропсы из Home
        } = params; */
        const { data } = await axios.get(
            'https://662215b527fcd16fa6c8b4f9.mockapi.io/reactpizza?page=' + filterSlice.currentPage + '&limit=5' + (filterSlice.categoryId > 0 ? `&category=${filterSlice.categoryId}` : '')
            + '&sortBy=' + filterSlice.sort.sortValue + '&order=' + filterSlice.sort.order + (filterSlice.searchData ? `&search=${filterSlice.searchData}` : '')
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