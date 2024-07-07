import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Readonly from '../Readonly/ReadonlyValue';

interface Parameter_DatePicker {
    setPickerData : (value : React.SetStateAction<Date | null>) => void,

    isStartDate? : boolean,
}
const Component_DatePicker = ({setPickerData, isStartDate} : Parameter_DatePicker) => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setPickerData(date);
    }, [date])

    return (
        <Div_Body>
            <Label_DatePickerTitle> {isStartDate ? "시작일" : "종료일"} </Label_DatePickerTitle>

            <Div_TitleMargin/>

            <DatePicker
                locale={ko}
                dateFormatCalendar="yyyy년 MM월"
                dateFormat="yyyy년 MM월 dd일"
                selected={date}
                onChange={changeValue => {setDate(changeValue)}}
            />
        </Div_Body>
    );
}

export default Component_DatePicker;

const Div_Body = styled.div`
    display: inline-flex;
    width: 240px;
    justify-content: space-between;
    cursor : pointer !important;
`;

const Label_DatePickerTitle = styled.label`
    color : ${Readonly.Color.Dark};
    font-weight : bold;
`;

const Div_TitleMargin = styled.div`
    width : 6px;
`;