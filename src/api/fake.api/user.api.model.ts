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

export type ProfessionMap<T> = Record<Professions, T>
export type QualitiesMap<T> = Record<Qualities, T>

export interface ObjectDTO {
    _id: string
    name: string
}

export interface ProfessionDTO extends ObjectDTO {
}

export interface QualityDTO extends ObjectDTO {
    color: string
}

export interface UserDTO extends ObjectDTO {
    profession: ProfessionDTO
    qualities: QualityDTO[]
    completedMeetings: number
    rate: number
    bookmark: boolean
}
