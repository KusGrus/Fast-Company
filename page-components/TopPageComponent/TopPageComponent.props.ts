import {LevelCategory, PageModel} from '../../interfaces/page.interface'
import {ProductModel} from '../../interfaces/product.interface'

export interface TopPageComponentProps {
    firstCategory: LevelCategory
    page: PageModel
    products: ProductModel[]
}
