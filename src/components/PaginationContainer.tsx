import React, {useState} from "react"
import {PaginationProps} from "./types";

function paginationContainer(Component: any) {
    return ({users, paging: propsPaging, ...rest}: PaginationProps) => {
        const [paging, setPaging] = useState(propsPaging || {count: 3, page: 1})


        const startIndex = paging.count * (paging.page - 1)
        const pageCount = Math.ceil(users.length / paging.count)
        const list = users.slice(startIndex, startIndex + paging.count)

        const handleGoFirst = () => setPaging((prevState => ({count: prevState.count, page: 1})))

        const handleGoLast = () => setPaging(prevState => ({count: prevState.count, page: pageCount}))

        const handlePaginationChange = (page: number) => setPaging((prevState => ({count: prevState.count, page})))

        return (
            <React.Fragment>
                <Component {...rest} users={list} paging={paging} onPaginationChange={handlePaginationChange}/>
                {pageCount > 1 && <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={handleGoFirst}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {[...Array(pageCount)].map((e, i) => {
                            const classes = 'page-item ' + (paging.page === i + 1 ? 'active' : '')
                            return (
                                <li className={classes} key={i} onClick={() => handlePaginationChange(i + 1)}>
                                    <a className="page-link" href="#">{i + 1}</a>
                                </li>)
                        })}
                        <li className="page-item" onClick={handleGoLast}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>}
            </React.Fragment>
        )
    }
}

export default paginationContainer
