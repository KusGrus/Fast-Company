import type {NextPage} from 'next'
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next'
import {withLayout} from '../../layout/Layout'
import {firstLevelMenu} from '../../helpers/helper'
import axios from 'axios'
import {MenuItem} from '../../interfaces/menu.interface'
import {ParsedUrlQuery} from 'querystring'
import {API} from '../../helpers/api'

const Type: NextPage<any> = ({firstCategory}: TypeProps): JSX.Element => {
    return (
        <>Type: {firstCategory}</>
    )
}

export default withLayout(Type)

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = firstLevelMenu.map(m => '/' + m.route)
    return {paths, fallback: true}
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {notFound: true}
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
    if (!firstCategoryItem) {
        return {notFound: true}
    }
    const firstCategory = firstCategoryItem.id
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory})
    return {props: {menu, firstCategory}}
}

interface TypeProps extends Record <string, unknown> {
    menu: MenuItem[]
    firstCategory: number
}
