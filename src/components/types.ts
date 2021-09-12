import { ProfessionDTO, ProfessionMap, UserDTO } from '../api/fake.api/user.api.model'

export interface ExtraUserDTO extends UserDTO {
    mark?: boolean
}

export interface GroupListProps {
    items: ProfessionMap<ProfessionDTO> | ProfessionDTO[] | undefined
    selectedItem: ProfessionDTO | undefined
    onItemSelect: (item: ProfessionDTO) => any
}

export interface FastStateProps {
    count: number
}

export interface CompanyListProps {
    users: ExtraUserDTO[]
    onDelete: (id: string) => any
    onMark: (id: string) => any
}

export interface FastListProps {
    user: ExtraUserDTO
    onDelete: (id: string) => any
    onMark: (id: string) => any
}

export interface BookmarkProps {
    user: ExtraUserDTO
    onMark: (id: string) => any
}

export interface Pagination {
    count: number
    page: number
}

export interface PaginationController {
    change: (page: number) => any
    first: () => any
    last: (page: number) => any
}

export interface PaginationProps extends CompanyListProps {
    paging: Pagination
    pageController: PaginationController
}
