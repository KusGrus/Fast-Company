import {UserDTO} from "../api/fake.api/user.api.model"

export interface ExtraUserDTO extends UserDTO {
    mark?: boolean;
}

export interface FastCompanyProps {
    users: ExtraUserDTO[]
}

export interface FastStateProps {
    count: number
}

export interface CompanyListProps extends FastCompanyProps {
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
