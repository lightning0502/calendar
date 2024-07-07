import { styled } from 'styled-components';
import Component_Calendar from './Component/Calendar';

const App = () => {
    return (
        <Div_AppBody>
            <Component_Calendar/>
        </Div_AppBody>
    );
}

const Div_AppBody = styled.div`
    margin-top: 2%;
`;

export default App;