import {DetailedHTMLProps, HTMLAttributes} from 'react'
import {ProductModel, ReviewModel} from '../../interfaces/product.interface'

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    review: ReviewModel
}
