import {UserDTO} from "../api/fake.api/user.api.model"

export interface FastCompanyProps {
    users: UserDTO[]
}

export interface FastCompanyState {
    users: UserDTO[]
}

export interface FastStateProps {
    count: number
}

export interface FastListProps {
    user: UserDTO
    onDelete: (id: string) => any
}
