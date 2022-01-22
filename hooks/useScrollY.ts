import {useCallback, useEffect, useState} from 'react'
import useIsBrowser from './useIsBrowser'

const useScrollY = (): number => {
    const isBrowser = useIsBrowser()
    const [scrollY, setScrollY] = useState<number>(0)

    const handleScroll = useCallback(() => {
        const currentScrollY = isBrowser ? window.scrollY : 0
        setScrollY(currentScrollY)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return scrollY
}

export default useScrollY
