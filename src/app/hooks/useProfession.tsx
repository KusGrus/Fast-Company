import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { ProfessionDTO } from '../../api/fake.api/api.model'
import professionService from '../services/profession.service'
import { UseProfessionContext } from './types'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext<UseProfessionContext | null>(null)

export const useProfession = (): UseProfessionContext => {
    return useContext(ProfessionContext) as UseProfessionContext
}

const ProfessionProvider = ({ children }: PropsWithChildren<any>) => {
    const [professions, setProfessions] = useState<ProfessionDTO[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const errorCatcher = (e: { response: { data: { message: any } } }) => {
        const { message } = e.response.data
        setError(message)
        setLoading(false)
    }

    const getProfessions = async () => {
        try {
            const { content } = await professionService.get()
            setProfessions(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getProfessionById = (id: string) => professions.find(p => p._id === id)

    useEffect(() => {
        getProfessions().then()
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            setError(null)
        }
    }, [error])


    return (
        <ProfessionContext.Provider value={{ professions, isLoading, getProfessionById }}>
            {children}
        </ProfessionContext.Provider>
    )
}

export default ProfessionProvider
