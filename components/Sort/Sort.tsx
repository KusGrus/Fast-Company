// @ts-ignore
import cn from 'classnames'
import styles from './Sort.module.css'
import {SortEnum, SortProps} from './Sort.props'
import SortIcon from '../../public/icons/sort.svg'

export const Sort = ({sort, setSort, className, ...props}: SortProps) => {
    return (
        <div className={cn(className, styles.sort)} {...props}>
            <span onClick={() => setSort(SortEnum.Rating)} className={cn({[styles.active]: sort === SortEnum.Rating})}>
                <SortIcon className={styles.icon}/>
                По рейтингу
            </span>
            <span onClick={() => setSort(SortEnum.Price)} className={cn({[styles.active]: sort === SortEnum.Price})}>
                <SortIcon className={styles.icon}/>
                По цене
            </span>
        </div>
    )
}
