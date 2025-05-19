import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchData: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortValue: 'raiting',
        order: 'desc'
    },
};
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchData(state, action) {
            state.searchData = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage); //говорим что принятые данные должны поменять именно указанные параметры после точки.currentPage.sort.categoryId
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        },

    }
});

export const selectSort = (state) => state.filterSlice.sort;
export const selectFilter = (state) => state.pizzal;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchData } = filterSlice.actions;

export default filterSlice.reducer;