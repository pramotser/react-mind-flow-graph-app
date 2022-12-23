import './datepicker.scss'
import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Form } from 'react-bootstrap'

const DatepickerCustom = (props) => {
    // const CustomInputTime = ({ value, onChange }) => (
    //     <>
    //         <Form.Control
    //             type="time"
    //             value={value}
    //             onChange={(e) => onChange(e.target.value)}
    //         />
    //     </>
    // );
    return (
        <>
            <DatePicker
                selected={props.selected}
                dateFormat={props.dateFormat}
                maxDate={props.maxDate}
                minDate={props.minDate}
                onChange={(date) => props.onChange(date)}
                placeholderText={props.placeholderText}
                customInput={(<Form.Control
                    type="text"
                    name='datepicker'
                    required={props.required}
                />)}
                required={props.required}
                disabled={props.disabled}
                // maxTime={new Date().setHours(23, 59, 59)}
                // minTime={new Date().setHours(0, 0)}
                // showTimeInput={props.showTimeInput}
                // timeInputLabel="Time : "
                // customTimeInput={<CustomInputTime />}
                showTimeSelect={true}
                timeFormat="HH:mm"
                injectTimes={[
                    setHours(setMinutes(new Date(), 1), 0),
                    setHours(setMinutes(new Date(), 5), 12),
                    setHours(setMinutes(new Date(), 59), 23),
                ]}
                showMonthDropdown
                showYearDropdown
            />
        </>
    )
}

export default DatepickerCustom