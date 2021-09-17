import { TableItem } from './table/table-models'
import { ObjectDTO } from '../api/fake.api/user.api.model'

export interface BookmarkProps {
    user: ItemForMark
    onMark: (item: ItemForMark) => any
}

export interface CompanyStateProps {
    total: number
}

export interface FiltersGroupProps {
    code: string
    filters: ObjectDTO[] | { [key: string]: ObjectDTO }
    selected: ObjectDTO
    onSelect: (code: string, item: ObjectDTO) => any
}

export interface ItemForMark extends TableItem {
    bookmark?: boolean
}

export interface FilterMap {
    [key: string]: ObjectDTO
}
