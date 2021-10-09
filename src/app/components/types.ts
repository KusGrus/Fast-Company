import { TableItem } from './table/table-models'
import { ObjectDTO, QualityDTO } from '../../api/fake.api/user.api.model'
import { BaseSyntheticEvent } from 'react'

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

export interface TextFormControl {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (event: BaseSyntheticEvent)=> void;
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
