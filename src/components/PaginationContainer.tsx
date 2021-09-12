import React from 'react'
import { PaginationProps } from './types'

function paginationContainer(Component: any) {
    return ({ users, paging, pageController, ...rest }: PaginationProps) => {
        const startIndex = paging.count * (paging.page - 1)
        const pageCount = Math.ceil(users.length / paging.count)
        const list = users.slice(startIndex, startIndex + paging.count)

        return (
            <React.Fragment>
                <Component
                    {...rest}
                    users={list}
                    paging={paging}
                />
                {pageCount > 1 && (
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={pageController.first}>
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
                                        onClick={() => pageController.change(i + 1)}
                                    >
                                        <a className="page-link" href="#">
                                            {i + 1}
                                        </a>
                                    </li>
                                )
                            })}
                            <li className="page-item" onClick={() => pageController.last(pageCount)}>
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
}

export default paginationContainer
