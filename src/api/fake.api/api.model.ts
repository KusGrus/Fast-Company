export type Professions =
    | 'doctor'
    | 'waiter'
    | 'physics'
    | 'engineer'
    | 'actor'
    | 'cook'

export type Qualities =
    | 'tedious'
    | 'strange'
    | 'buller'
    | 'alcoholic'
    | 'handsome'
    | 'uncertain'
    | string

export type ProfessionMap<T> = Record<Professions, T>
export type QualitiesMap<T> = Record<Qualities, T>

export interface ObjectDTO {
    _id: string
    name: string
}

export interface ProfessionDTO extends ObjectDTO {
    updatedAt?: string
    createdAt?: string
}

export interface QualityDTO extends ObjectDTO {
    color: string
}

export interface UserDTO extends ObjectDTO {
    email: string
    sex: 'male' | 'female' | 'other'
    profession: ProfessionDTO
    qualities: QualityDTO[]
    completedMeetings: number
    rate: number
    imageSrc?: string
    bookmark: boolean
}

export interface CommentDTO {
    _id: string
    userId: string
    pageId: string
    content: string
    createdAt: string
}
