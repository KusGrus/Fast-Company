import React, {useEffect, useReducer} from 'react'
import styles from './TopPageComponent.module.css'
import {TopPageComponentProps} from './TopPageComponent.props'
import {Advantages, HhData, Htag, Product, Sort, Tag} from '../../components'
import {LevelCategory} from '../../interfaces/page.interface'
import {SortEnum} from '../../components/Sort/Sort.props'
import {sortReducer} from '../sort.reducer'
import useScrollY from '../../hooks/useScrollY'

export const TopPageComponent = ({page, products, firstCategory}: TopPageComponentProps): JSX.Element => {
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating})
    const y = useScrollY()

    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort})
    }

    useEffect(()=>{
        dispatchSort({type: 'reset', initialState: products})
    }, [products])

    if (!page) {
        return <></>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                <Tag color="gray" size="medium">{products?.length || 0}</Tag>
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div>
                {sortedProducts?.map(p => <Product layout product={p} key={p._id}/>)}
            </div>
            <div className={styles['hh-title']}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                <Tag color="red" size="medium">hh.ru</Tag>
            </div>
            {firstCategory === LevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            {page.addresses && page.advantages && page.advantages?.length > 0 && <>
                <Htag tag="h2">Приемущества</Htag>
                <Advantages advantages={page.advantages}/>
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags.map(tag => <Tag key={tag} color="primary">{tag}</Tag>)}
        </div>
    )
}
