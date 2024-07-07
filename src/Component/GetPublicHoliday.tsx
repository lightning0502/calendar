// import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Interface_PublicHoliday } from '../API/PublicHoliday';
import Readonly from '../Readonly/ReadonlyValue';
import CustomProperties from '../Utility/CustomProperties';

export interface Interface_Parameter {
    list : Interface_PublicHoliday[]
}
const Component_List_PublicHoliday = ({list} : Interface_Parameter) => {
    return (
        <Div_Body>
            <Label_Title>공휴일 목록</Label_Title>

            <Div_ListBody>
                { list && list.length > 0 && list.map((holidayItem, index) => (
                    <List_ItemBody key={index}>
                        <Label_Item _color={"#6e728f"} _textAlign="left" _marginBottom="6px" _isBold >{holidayItem.date}</Label_Item>
                        <Label_Item _textAlign="center" _isBold >{holidayItem.localName}</Label_Item>
                        <Label_Item _textAlign="center" _fontSize={"12px"} >{"(" + holidayItem.name + ")"}</Label_Item>
                        {/* <P_Item>국가 코드 : {holidayItem.countryCode}</P_Item> */}
                        {/* <P_Item>고정 여부 : {holidayItem.fixed ? '예' : '아니요'}</P_Item> */}
                        {/* <P_Item>전 세계 공휴일 여부 : {holidayItem.global ? '예' : '아니요'}</P_Item> */}
                        {/* {holidayItem.counties && <P_Item>적용 지역 : {holidayItem.counties.join(', ')}</P_Item>} */}
                        {/* {holidayItem.launchYear && <P_Item>시작 연도 : {holidayItem.launchYear}</P_Item>} */}
                        {/* <P_Item>타입 : {holidayItem.type}</P_Item> */}
                    </List_ItemBody>
                ))}
            </Div_ListBody>
        </Div_Body>
    );
}

export default Component_List_PublicHoliday;

// CSS
const Div_Body = styled.div`
    /* height: max-content; */
    width : 800px;
`;

const Label_Title = styled.label`
    font-size : 20px;
    background-color : ${Readonly.Color.Yellow};
    border-radius : 15px 15px 0 0;
    padding: 10px 20px 10px 20px;
    border: 2px solid #ecff44;
    font-weight : bold;
    color : ${Readonly.Color.Dark};
`;

const Div_ListBody = styled.div`
    padding: 10px;
    background-color : ${Readonly.Color.Yellow};
    border: 2px solid #ecff44;
    border-radius : 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const List_ItemBody = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    width : 220px;
    margin : 6px;
    padding : 4px 10px 4px 10px;
    border-radius: 10px;
    border: 2px solid #66633978;
    background-color : #9e9e9e2f;
    flex-wrap: wrap;
    min-height : 80px;
`;

const Label_Item = styled.label<CustomProperties>`
    width : 100%;
    text-align: ${(customProp) => (customProp._textAlign)};
    margin-bottom : ${(customProp) => (customProp._marginBottom)};
    font-weight : ${(customProp) => (customProp._isBold ? "bold" : "")};
    font-size : ${(customProp) => (customProp._fontSize)};
    color : ${(customProp) => (customProp._color)};
`;