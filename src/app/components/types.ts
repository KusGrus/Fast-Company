import { TableItem } from './common/table/table-models'
import { ObjectDTO, QualityDTO } from '../../api/fake.api/user.api.model'
import { BaseSyntheticEvent } from 'react'
import { UseFormChangeFn, UseFormRegisterControlFn } from '../hooks/types'

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

export interface FormControl {
    label: string;
    name: string;
    value?: any;
    error?: string;
    instance?: FormControl;
    onChange: UseFormChangeFn;
}

export interface TextFormControl extends FormControl {
    type?: string;
}

export interface SelectFormControl extends FormControl {
    items: ObjectDTO[];
    value?: ObjectDTO;
}

export interface RadioFormControl extends FormControl {
    items: ObjectDTO[];
    value?: ObjectDTO;
}

export interface UserCardProps {
    id: string;
}

export interface FiltersGroupProps {
    code: string;
    filters: ObjectDTO[] | { [key: string]: ObjectDTO };
    selected: ObjectDTO;
    onSelect: (code: string, item: ObjectDTO) => any;
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
