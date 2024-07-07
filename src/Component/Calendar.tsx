import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import API, { Interface_PublicHoliday } from '../API/PublicHoliday';
import Readonly from '../Readonly/ReadonlyValue';
import CustomProperties from '../Utility/CustomProperties';
import Component_DatePicker from './DatePicker';
import Component_DetailButton from './DetailButton';
import Component_TooltipBox from './TooltipBox';

const Component_Calendar : React.FC = () => {
    const [date_Start, setDate_Start] = useState<Date | null>(null);
    const [date_End, setDate_End] = useState<Date | null>(null);
    const [list_Holidays, setList_AllHolidays] = useState<Interface_PublicHoliday[]>([]);
    const [list_FilteredHolidays, setList_FilteredHolidays] = useState<Interface_PublicHoliday[] | null>(null);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false); // notification 강조하기 위함
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [resultMessage, setResultMessage] = useState<string>("");

    useEffect(() => {
        // null check & error message handling
        if (!date_Start || !date_End)
            return;

        // date picker의 할당 시간은 00:00:00이다. 23:59:59라도 해당하지 않으므로 선택한 날짜의 공휴일 체크에서 벗어난다.
        const date_Maximum = new Date(date_End);
        date_Maximum.setDate(date_Maximum.getDate() + 1);

        // 검색에 대한 날짜 필터 걸기
        const filteredDays = list_Holidays.filter((holidayItem) => {
            const date = new Date(holidayItem.date);

            return date >= date_Start && date <= date_Maximum;
        });

        setList_FilteredHolidays(filteredDays.length === 0 ? [] : filteredDays);
    }, [list_Holidays]);

    useEffect(() => {
        // 검색된 날짜에 대해 값이 없는 경우
        setResultMessage(list_FilteredHolidays?.length === 0 ? "지정된 날짜에 공휴일이 없습니다ㅠㅜㅜ흑흑" : "");
        console.log("검색 내용 : ", list_FilteredHolidays);
    }, [list_FilteredHolidays]);

    useEffect(() => {
        setTooltipVisible(false);
        setResultMessage("");
    }, [date_End, date_Start]);

    useEffect(() => {
        if (!date_Start || !date_End)
            return;

        if (date_Start.getTime() > date_End.getTime())
        {
            setTooltipVisible(true);
            setErrorMessage("날짜를 확인해주세요. 시작일이 종료일보다 미래에요!");

            return;
        }
    }, [date_End]);

    const onClick_Search = async () => {
        // initialize
        let errorMessage = "";
        setTooltipVisible(true);

        // value check
        if (!date_Start)
            errorMessage = "시작일을 선택해주세요.";

        else if (!date_End)
            errorMessage = "종료일을 선택해주세요.";

        if (!date_Start || !date_End)
        {
            setErrorMessage(errorMessage.length > 0 ? errorMessage : "시작일과 종료일을 선택해주세요!");

            return;
        }

        // 날짜 변경 시 시작일이 종료일보다 크면 NG
        else if (date_Start.getTime() > date_End.getTime())
        {
            setTooltipVisible(true);
            setErrorMessage("날짜를 확인해주세요. 시작일이 종료일보다 미래에요!");

            return;
        }

        // 요구 사항 체크
        const endFullYear = date_End.getFullYear();
        if (endFullYear > Readonly.Value.YAER_MAXIMUM_2025) {
            setErrorMessage("종료일은 2025년까지만 선택할 수 있습니다.");

            return;
        }

        if (((date_End.getTime() - date_Start.getTime()) / Readonly.Value.DAY_MAXIMUM_DISTANCE) > 2) {
            setErrorMessage("시작일과 종료일의 간격은 최대 2년입니다.");

            return;
        }

        // Nager.Date API 호출 (https://date.nager.at/Api)
        setErrorMessage("");
        setTooltipVisible(false);
        await API.GetPublicHolidays([date_Start.getFullYear(), endFullYear], setList_AllHolidays);
    };

    return (
        <>
            <Div_AlignCenter>
                <Div_DatePickerAlignment>
                    <Component_DatePicker setPickerData={setDate_Start} isStartDate />
                    <Div_MarginHeight _height={"6px"} />
                    <Component_DatePicker setPickerData={setDate_End} />

                    <Component_TooltipBox text={errorMessage} isVisible={tooltipVisible} position_X="0" position_Y="10px" />
                </Div_DatePickerAlignment>

                <Button_Search onClick={onClick_Search}>
                    <Span_Icon>🔎</Span_Icon>
                </Button_Search>

                <Component_TooltipBox
                    text={resultMessage}
                    isVisible={resultMessage.length > 0 ? true : false}
                    position_X="0" position_Y="53px"
                />
            </Div_AlignCenter>

            {/* 공휴일 결과 */}
            <Div_SearchResult>
                {errorMessage.length === 0 && resultMessage.length === 0 && list_FilteredHolidays &&
                    <>
                        <Label_ResultTitle _fontSize={"20px"} _isBold >검색된 공휴일 수</Label_ResultTitle>
                        <Label_ResultTitle _fontSize={"11px"} >(자세히 보려면 숫자를 클릭)</Label_ResultTitle>

                        <Component_DetailButton list_Holiday={list_FilteredHolidays} marginTop={"10px"} />
                    </>
                }
            </Div_SearchResult>
        </>
    );
}

export default Component_Calendar;


// CSS
const Div_AlignCenter = styled.div`
    background-color: #fff4aa;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Label_ResultTitle = styled.label<CustomProperties>`
    font-size : ${(customProp) => (customProp._fontSize)};
    font-weight : ${(customProp) => (customProp._isBold ? "bold" : "")};
    color : ${Readonly.Color.Dark};
`;

const Div_SearchResult = styled.div`
    margin-top : 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Div_MarginHeight = styled.div<CustomProperties>`
    height : ${(customProp) => (customProp._height)};
`;

const Div_DatePickerAlignment = styled.div`
    margin-right : 30px;
`;

const Span_Icon = styled.span`
    font-size: 28px;
    z-index : 1;

    &.span {
        position: relative;
        z-index: 2;
        transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
    }

    &:hover .span {
        scale: 1.5;
    }
`;

const Button_Search = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e8e8e8;
    background-color: ${Readonly.Color.Dark};
    width: 60px;
    height: 60px;
    text-transform: uppercase;
    border: 3px solid #0099ff;
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: 5px 5px 2px rgba(0, 0, 0, 0.3),
        2px 2px 2px rgba(0, 0, 0, 0.15),
        -3px -3px 2px rgba(255, 255, 255, 0.2),
        -2px -2px 1px rgba(255, 255, 255, 0.2);
    overflow: hidden;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        background-color: #e8e8e8;
        width: 150%;
        height: 150%;
        left: 0%;
        bottom: 0%;
        transform: translate(-100%, 100%) rotate(45deg);
        border-radius: 15px;
    }

    &:hover::before {
        animation: ${() => (Animation_ShakeBack)} 2.5s forwards 0.01s;
    }

    &:hover {
        box-shadow: 7px 7px 4px rgba(0, 0, 0, 0.5);
    }

    &:active {
        scale: 0.65;
    }
`;

const Animation_ShakeBack = keyframes`
    0% {
        transform: translate(-150%, 150%) rotate(45deg);
    }

    50% {
        transform: translate(30%, -30%) rotate(45deg);
    }

    100% {
        transform: translate(-10%, 10%) rotate(45deg);
    }
`;