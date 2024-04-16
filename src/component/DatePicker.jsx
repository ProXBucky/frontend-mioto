import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const pastMonth = new Date()
import viLocale from 'date-fns/locale/vi';
import "../assets/css/datePicker.css"


function DatePicker() {

    const [range, setRange] = useState([]);
    let totalDays = 0;
    let footer = <p>Hãy chọn ngày đi và ngày về</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP', { locale: viLocale })}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, 'PPP', { locale: viLocale })} – {format(range.to, 'PPP', { locale: viLocale })}
                </p>
            );
            totalDays = differenceInDays(range.to, range.from) + 1;
        }
    }

    return (
        <div>
            <DayPicker
                className='h-80'
                numberOfMonths={2}
                id="test"
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                onSelect={setRange}
                locale={viLocale}
            />
            <div className='text-lg font-semibold'>{footer}</div>
            <div>Số ngày thuê: {totalDays} ngày</div>
        </div>
    );
}

export default DatePicker