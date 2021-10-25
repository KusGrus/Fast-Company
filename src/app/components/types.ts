import { TableItem } from './common/table/table-models'
import { CommentDTO, ObjectDTO, QualityDTO, UserDTO } from '../../api/fake.api/api.model'
import { UseFormChangeFn } from '../hooks/types'

export const requiredText = 'This field is required'

export interface BookmarkProps {
    user: ItemForMark;
    onMark: (item: ItemForMark) => any;
}

export interface CompanyStateProps {
    total: number;
}

export interface QualitiesListProps {
    qualities: QualityDTO[];
}

export interface UserProfileProps {
    user: UserDTO;
}

export interface UserEditProps {
    user: UserDTO;
    onUpdate: (data: any) => void;
}


export interface UserCardProps {
    id: string;
}

export interface CommentFormProps {
    users: UserDTO[];
    onSend: (data: any) => void;
}

export interface CommentProps {
    user: UserDTO | undefined;
    comment: CommentDTO;
    onDelete: (id: string)=>void
}

export interface FiltersGroupProps {
    code: string;
    filters: ObjectDTO[] | { [key: string]: ObjectDTO };
    selected: ObjectDTO;
    onSelect: (code: string, item: ObjectDTO) => any;
}


export interface FormControl {
    label?: string;
    name: string;
    value?: any;
    error?: string;
    onChange: UseFormChangeFn;
    registry?: (name: string, value?: any) => void;
}

export interface InputFormControl extends FormControl {
    type?: string;
}

export interface TextAreaFormControl extends FormControl {
    placeholder?: string
}

export interface SelectFormControl extends FormControl {
    items: ObjectDTO[];
    value?: ObjectDTO;
}

export interface MultiSelectFormControl extends FormControl {
    items: ObjectDTO[];
    values?: any;
}

export interface RadioFormControl extends FormControl {
    items: ObjectDTO[];
    value?: string;
}

export interface CheckBoxFormControl extends FormControl {
    value?: boolean;
}

export interface ItemForMark extends TableItem {
    bookmark?: boolean;
}

export interface FilterMap {
    [key: string]: ObjectDTO;
}

export interface TableItemWithQuality extends TableItem {
    qualities: QualityDTO[];
}

export interface Gender {
    name: string;
    _id: string;
}

export const genderOptions: Gender[] = [
    { name: 'Male', _id: 'male' },
    { name: 'Female', _id: 'female' },
    { name: 'Other', _id: 'other' }
]
