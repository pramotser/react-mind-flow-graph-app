import './single.scss'
import React from 'react'
import Select from 'react-select'

const SelectSingle = (props) => {
    return (
        <>
            <Select
                className={props.className}
                options={props.options}
                placeholder={props.placeholder}
                isSearchable={props.isSearchable}
                value={props.value}
                onChange={e => props.onChange(e)}
                isDisabled={props.isDisabled}
                // style={props.style}
                // styles={props.styles}                
                isLoading={props.isLoading}
                isClearable={props.isClearable}
                isRtl={props.isRtl}
            />
        </>
    )
}
export default SelectSingle;