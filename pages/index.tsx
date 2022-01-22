import type {GetStaticProps, NextPage} from 'next'
import {Htag, Button, Paragraph, Tag, Input} from '../components'
import {Rating} from '../components/Rating/Rating'
import {withLayout} from '../layout/Layout'
import axios from 'axios'
import {MenuItem} from '../interfaces/menu.interface'
import {API} from '../helpers/api'

const Home: NextPage<HomeProps> = ({menu, firstCategory}): JSX.Element => {
    const handleSetRating = (i: number) => {
        console.log(i)
    }
    return (
        <>
            <Htag tag="h1">sdfsdfsdfsdf dsafsdf</Htag>
            <Button appearance="ghost" arrow="right">button</Button>
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum eius expedita illum nihil quos repellendus
                tempora? Commodi, delectus deserunt esse hic inventore minima, minus, natus nemo neque officiis porro
                quae!
            </Paragraph>
            <Tag color="primary">qwdqw</Tag>
            <Rating rating={4} setRating={handleSetRating} isEditable/>
            <Input placeholder="Test"/>
        </>
    )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory})
    return {
        props: {
            menu,
            firstCategory
        }
    }
}

interface HomeProps extends Record <string, unknown> {
    menu: MenuItem[]
    firstCategory: number
}
