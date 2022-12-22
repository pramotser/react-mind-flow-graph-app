import React from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap'

const DatepickerCustom = (props) => {
    return (
        <>
            <DatePicker
                selected={props.selected}
                dateFormat={props.dateFormat}
                maxDate={props.maxDate}
                minDate={props.minDate}
                onChange={(date) => props.onChange(date)}
                placeholderText={props.placeholderText}
                required={props.required}
                showTimeInput={props.showTimeInput}
                disabled={props.disabled}
                customInput={(
                    <Form.Control
                        type="text"
                        name='datepicker'
                        required={props.required}
                    />
                )}
            />
        </>
    )
}

export default DatepickerCustom