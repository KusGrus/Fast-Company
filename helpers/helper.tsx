import {FirstLevelMenuItem} from '../interfaces/menu.interface'
import {LevelCategory} from '../interfaces/page.interface'
import CoursesIcon from '../public/icons/courses.svg'
import ServicesIcon from '../public/icons/services.svg'
import BooksIcon from '../public/icons/books.svg'
import ProductsIcon from '../public/icons/products.svg'
import React from 'react'

export const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', id: LevelCategory.Courses, icon: <CoursesIcon/>},
    {route: 'services', name: 'Сервисы', id: LevelCategory.Services, icon: <ServicesIcon/>},
    {route: 'books', name: 'Книги', id: LevelCategory.Books, icon: <BooksIcon/>},
    {route: 'products', name: 'Продукты', id: LevelCategory.Products, icon: <ProductsIcon/>}
]

export const price = (price: number): string => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽')

export const declOfNum = (number: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[(number % 100 > 4 && number % 100  <20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}
