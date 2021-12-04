import React, { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { QualityDTO } from '../../api/fake.api/api.model'
import { toast } from 'react-toastify'
import qualityService from '../services/qualities.service'
import { UseQualityContext } from './types'

const QualityContext = React.createContext<UseQualityContext | null>(null)

export const useQuality = (): UseQualityContext => {
    return useContext(QualityContext) as UseQualityContext
}

const QualityProvider = ({ children }: PropsWithChildren<any>) => {
    const [qualities, setQualities] = useState<QualityDTO[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const errorCatcher = (e: { response: { data: { message: any } } }) => {
        const { message } = e.response.data
        setError(message)
        setLoading(false)
    }

    const getProfessions = async () => {
        try {
            const { content } = await qualityService.get()
            setQualities(content)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const getQualityById = (id: string) => qualities.find(p => p._id === id)

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
        <QualityContext.Provider value={{ qualities, isLoading, getQualityById }}>
            {children}
        </QualityContext.Provider>
    )
}

export default QualityProvider
