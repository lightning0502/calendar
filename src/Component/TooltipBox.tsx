import styled, { keyframes } from "styled-components";
import Readonly from "../Readonly/ReadonlyValue";
import CustomProperties from "../Utility/CustomProperties";

interface Interface_TooltipBox {
    position_X : string,
    position_Y : string,
    isVisible : boolean,
    text : string | null
}

const Component_TooltipBox = ({text, isVisible, position_X, position_Y} : Interface_TooltipBox) => {
    return (
        <Div_BodyPosition _translatePosition={position_X + ", " + position_Y}>
            { isVisible &&
                <Div_BodyShake>
                    <Div_BodyOpacity>
                        <P_ErrorMessage> {text} </P_ErrorMessage>
                    </Div_BodyOpacity>
                </Div_BodyShake>
            }
        </Div_BodyPosition>
    );
}

const Div_BodyPosition = styled.div<CustomProperties>`
    position: absolute;
    transform: translate(${(customProp) => (customProp._translatePosition)});
`;

const P_ErrorMessage = styled.p`
    color : ${Readonly.Color.ErrorFontColor};
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    width: max-content;
    margin-left: 24px;
    margin-right: 24px;
`;

const Value_Minus = "-1.6px", Value_Plus = "1.6px";
const Animation_Shake = keyframes`
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }

    20% {
        -webkit-transform: translate(${Value_Minus}, ${Value_Plus});
        transform: translate(${Value_Minus}, ${Value_Plus});
    }

    40% {
        -webkit-transform: translate(${Value_Minus}, ${Value_Minus});
        transform: translate(${Value_Minus}, ${Value_Minus});
    }

    60% {
        -webkit-transform: translate(${Value_Plus}, ${Value_Plus});
        transform: translate(${Value_Plus}, ${Value_Plus});
    }

    80% {
        -webkit-transform: translate(${Value_Plus}, ${Value_Minus});
        transform: translate(${Value_Plus}, ${Value_Minus});
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
`;

const Animation_Opacity = keyframes`
    from {
        opacity : 0;
    }

    to {
        opacity : 1;
    }
`;

const Div_BodyShake = styled.div`
    animation: ${() => (Animation_Shake)} 0.25s forwards;
    animation-delay : 0.5s;
`;

const Div_BodyOpacity = styled.div`
    animation: ${() => (Animation_Opacity)} 1s forwards;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${Readonly.Color.Dark};
    border-radius: 5px;
    height: 28px;
`;

export default Component_TooltipBox;