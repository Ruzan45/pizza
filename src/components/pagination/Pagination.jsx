import React from 'react'

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


export default function Pagination({ currentPage, onChangePage }) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={10}
            pageCount={2}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
}
