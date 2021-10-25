import React, { useEffect, useState } from 'react'
import { MultiSelectFormControl } from '../../types'
import Select from 'react-select'
import { ObjectDTO } from '../../../../api/fake.api/api.model'

const MultiSelectField = ({ label, items, values = [], name, onChange, registry }: MultiSelectFormControl) => {
    const [list, setList] = useState <Array<{ value: any, label: string }>>([])

    const convert = (array: ObjectDTO[]) => array.map(item => ({ value: item?._id, label: item?.name }))

    const handleSelect = (array: any) => {
        const target = list?.length ? items : values
        const result = array.map((item: { value: string }) => target.find((i: { _id: string }) => i?._id === item.value))
        onChange(name, result)
    }

    const selected = convert(values)

    useEffect(() => {
        if (registry) {
            registry(name)
        }
    }, [])

    useEffect(() => {
        const list = convert(items)
        setList(list)
    }, [items])


    return (
        <div className="mb-4" >
            <label className="form-label" style={{ display: 'block' }}>{label}</label>
            <Select
                isMulti
                options={list}
                value={selected}
                closeMenuOnSelect={false}
                onChange={handleSelect}/>
        </div>
    )
}

export default MultiSelectField
