import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type SortFilter = {
    name: string,
    sortValue: 'raiting' | 'price' | 'title',
    order: string;
}

export interface FilterSliceState {
    searchData: string,
    categoryId: number,
    currentPage: number,
    sort: SortFilter,
}


const initialState: FilterSliceState = {
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
        setSearchData(state, action: PayloadAction<string>) {
            state.searchData = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortFilter>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.currentPage = Number(action.payload.currentPage); //говорим что принятые данные должны поменять именно указанные параметры после точки.currentPage.sort.categoryId
            state.sort = action.payload.sort;
            state.categoryId = Number(action.payload.categoryId);
        },

    }
});

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilter = (state: RootState) => state.pizzal;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchData } = filterSlice.actions;

export default filterSlice.reducer;