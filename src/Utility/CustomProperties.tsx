import { CSSProperties } from "styled-components";

interface CustomProperties extends CSSProperties {
    // boolean
    _isBold? : boolean,
    _isActive? : boolean,
    _isVisible? : boolean,
    _isDisabled? : boolean,

    // values
    _content? : string | null,
    _width? : string | number,
    _fontSize? : string | number,
    _height? : string | number,
    _zIndex? : number,
    _color? : string | number,
    _display? : string,
    _marginTop? : string,
    _marginBottom? : string,
    _translatePosition? : string,
    _textAlign? : string,
}

export default CustomProperties;