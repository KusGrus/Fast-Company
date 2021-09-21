import React from 'react'
import { PaginationProps } from './table-models'

const Pagination = ({ total, paging, controller }: PaginationProps) => {
    const pageCount = Math.ceil(total / paging.count)

    return (
        <React.Fragment>
            {pageCount > 1 && (
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={controller.first}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {[...Array(pageCount)].map((e, i) => {
                            const classes =
                                'page-item ' + (paging.page === i + 1 ? 'active' : '')
                            return (
                                <li
                                    className={classes}
                                    key={i}
                                    onClick={() => controller.change(i + 1)}
                                >
                                    <a className="page-link" href="#">
                                        {i + 1}
                                    </a>
                                </li>
                            )
                        })}
                        <li className="page-item" onClick={() => controller.last(pageCount)}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </React.Fragment>
    )
}

export default Pagination
