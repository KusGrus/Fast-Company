// @ts-ignore
import cn from 'classnames'
import styles from './Search.module.css'
import {SearchProps} from './Search.props'
import {Input} from '../Input/Input'
import {Button} from '../Button/Button'
import {useState} from 'react'
import SearchIcon from '../../public/icons/search.svg'
import {useRouter} from 'next/router'

export const Search = ({className, ...props}: SearchProps) => {
    const [search, setSearch] = useState<string>('')
    const router = useRouter()

    const go = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        }).then()
    }

    const handleKeyDown = (e: { key: string }) =>{
        if (e.key === 'Enter') {
            go()
        }

    }

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input placeholder="Поиск..."
                className={styles.input}
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}/>
            <Button appearance="primary" className={styles.btn} onClick={go}>
                <SearchIcon/>
            </Button>
        </div>
    )
}
