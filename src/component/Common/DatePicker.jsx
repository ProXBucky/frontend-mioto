import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const pastMonth = new Date()
import viLocale from 'date-fns/locale/vi';
import "../../assets/css/datePicker.css"


function DatePicker({ setBeDate, setEnDate }) {
    const [range, setRange] = useState([]);

    let totalDays = 0;
    let footer = <p>Hãy chọn ngày đi và ngày về</p>;
    if (range?.from) {
        const beginDate = format(range.from, 'dd/MM/yyyy'); // Định dạng ngày thành chuỗi
        setBeDate(beginDate);
        if (!range.to) {
            footer = <p>{format(range.from, 'P', { locale: viLocale })}</p>;
        } else if (range.to) {
            const endDate = format(range.to, 'dd/MM/yyyy'); // Định dạng ngày thành chuỗi
            setEnDate(endDate);
            footer = (
                <p>
                    {format(range.from, 'P', { locale: viLocale })} – {format(range.to, 'P', { locale: viLocale })}
                </p>
            );
            totalDays = differenceInDays(range.to, range.from);
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