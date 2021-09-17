export type Sorting = 'asc' | 'desc' | 'default'

export interface Column {
    code: string
    title: string;
    path?: string;
    componentFn?: Function
    sort?: Sorting
}

export interface SortFieldState {
    code: string;
    sort: Sorting
}

export interface TableProps {
    items: TableItem[]
    columns: Column[]
    paging: Paging
    onChangePanging: PaginationController
}

export interface TableHeaderProps {
    activeSort: SortFieldState | undefined
    columns: Column[]
    onSort: (code: string) => any
}

export interface TableBodyProps {
    items: TableItem[]
    columns: Column[]
}

export interface PaginationProps {
    paging: Paging
    total: number
    controller: PaginationController
}

export interface Paging {
    page: number
    count: number
}

export interface PaginationController {
    change: (page: number) => any
    first: () => any
    last: (page: number) => any
}

export interface TableItem {
    _id: string;

    [key: string]: any
}
