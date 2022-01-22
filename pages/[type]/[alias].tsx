import type {GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage} from 'next'
import {withLayout} from '../../layout/Layout'
import axios from 'axios'
import {MenuItem} from '../../interfaces/menu.interface'
import {LevelCategory, PageModel} from '../../interfaces/page.interface'
import {ParsedUrlQuery} from 'querystring'
import {ProductModel} from '../../interfaces/product.interface'
import {firstLevelMenu} from '../../helpers/helper'
import {TopPageComponent} from '../../page-components'
import {API} from '../../helpers/api'

const Page: NextPage<PageProps> = ({menu, page, products, firstCategory}): JSX.Element => {
    return <TopPageComponent page={page} firstCategory={firstCategory} products={products}/>
}

export default withLayout(Page)

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = []
    for (let menuItem of firstLevelMenu) {
        const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {firstCategory: menuItem.id})
        paths = paths.concat(menu.flatMap(m => m.pages.map(p => `/${menuItem.route}/${p.alias}`)))
    }
    return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<PageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {notFound: true}
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
    if (!firstCategoryItem) {
        return {notFound: true}
    }
    const firstCategory = firstCategoryItem.id
    try {
        const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory})
        if (!menu?.length) {
            return {notFound: true}
        }
        const {data: page} = await axios.get<PageModel>(API.topPage.byAlias + params.alias)
        const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
            category: page.category,
            limit: 10
        })
        return {props: {menu, firstCategory, page, products}}
    } catch {
        return {notFound: true}
    }
}

interface PageProps extends Record <string, unknown> {
    menu: MenuItem[]
    firstCategory: LevelCategory
    page: PageModel
    products: ProductModel[]
}
