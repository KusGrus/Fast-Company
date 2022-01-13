import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './store'
import qualityService from '../services/qualities.service'
import { QualityDTO } from '../../api/fake.api/api.model'

interface QualitiesState {
    entities: QualityDTO[]
    isLoading: boolean
    error: string | null
    timestamp: number | null
}

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        timestamp: null
    } as QualitiesState,
    reducers: {
        requested: state => {
            state.isLoading = true
        },
        received: (state, { payload }: PayloadAction<QualityDTO[]>) => {
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

export const { reducer, actions } = qualitiesSlice
const { received, requested, fail } = actions

export const loadQualitiesList = () => async (dispatch: AppDispatch) => {
    dispatch(requested())
    try {
        const { content } = await qualityService.get()
        dispatch(received(content))
    } catch (e) {
        dispatch(fail(e.message))
    }
}

export const getQualities = (state: RootState) => state.qualities.entities
export const getQualitiesIsLoading = (state: RootState) => state.qualities.isLoading
export const getQualityByIds = (ids: string[]) => (state: RootState) => state.qualities.entities?.filter(q => ids?.includes(q._id))

export default reducer
