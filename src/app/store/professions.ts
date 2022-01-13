import { ProfessionDTO } from '../../api/fake.api/api.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'
import professionService from '../services/profession.service'

interface ProfessionsState {
    entities: ProfessionDTO[]
    isLoading: boolean
    error: string | null
    timestamp: number | null
}

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        timestamp: null
    } as ProfessionsState,
    reducers: {
        requested: state => {
            state.isLoading = true
        },
        received: (state, { payload }: PayloadAction<ProfessionDTO[]>) => {
            state.entities = payload
            state.timestamp = Date.now()
            state.isLoading = false
        },
        fail: (state, { payload }: PayloadAction<string>) => {
            state.error = payload
            state.isLoading = false
        }
    }
})

export const { reducer, actions } = professionsSlice
const { received, requested, fail } = actions

export const loadProfessionsList = () => async (dispatch: AppDispatch) => {
    dispatch(requested())
    try {
        const { content } = await professionService.get()
        dispatch(received(content))
    } catch (e) {
        dispatch(fail(e.message))
    }
}

export const getProfessions = (state: RootState) => state.professions.entities
export const getProfessionsIsLoading = (state: RootState) => state.professions.isLoading
export const getProfessionsById = (id: string) => (state: RootState) => state.professions.entities?.find(q => id === q._id)

export default reducer
