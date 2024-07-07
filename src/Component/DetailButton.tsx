import { useEffect, useState } from "react";
import styled from "styled-components";
import { Interface_PublicHoliday } from "../API/PublicHoliday";
import CustomProperties from "../Utility/CustomProperties";
import Component_List_PublicHoliday from "./GetPublicHoliday";

interface Interface_CheckButton {
    list_Holiday : Interface_PublicHoliday[],

    marginTop? : string,
}
const Component_CheckButton = ({list_Holiday, marginTop} : Interface_CheckButton) => {
    const [isClicked, setClicked] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    return (
        <>
            <Button_Body
                _isActive={isClicked}
                onClick={() => setClicked(!isClicked)}
                _marginTop={marginTop}
            >
                {list_Holiday.length}
            </Button_Body>

            { isClicked &&
                <Component_List_PublicHoliday list={list_Holiday} />
            }
        </>
    );
}

const Button_Body = styled.button<CustomProperties>`
    width : 50px;
    height : 50px;
    font-size : 26px;
    font-weight : bold;
    cursor : pointer;
    border-radius : 50%;
    margin-top : ${(customProp) => (customProp._marginTop)};
    border: 5px solid ${(customProp) => (customProp._isActive ? "#330000" : "#ff0000")};
`;

export default Component_CheckButton;