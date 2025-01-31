import React from 'react'

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


export default function Pagination({ onChangePage }) {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={2}
            renderOnZeroPageCount={null}
        />
    )
}
