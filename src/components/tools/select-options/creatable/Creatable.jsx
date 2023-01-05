import './creatable.scss'
import React from 'react'

import CreatableSelect from 'react-select/creatable';

const SelectCreatable = (props) => {
    return (
        <>
            <CreatableSelect
                isClearable={props.isClearable}
                options={props.options}
                placeholder={props.placeholder}
                isSearchable={props.isSearchable}
                value={props.value}
                onChange={e => props.onChange(e)}
            />
        </>
    )
}
export default SelectCreatable;