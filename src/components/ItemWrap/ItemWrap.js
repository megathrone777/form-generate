import React from 'react';
import {
    InputWrap,
    Input,
    Text,
    Label
} from './styled';

const ItemWrap = ({ label, type, text }) => {
    return (
        <InputWrap>
            <Label htmlFor={label}>{label}</Label>
            {type === 'textarea' &&
                <Text id={label} /> ||
                <Input id={label} type={type} text={text ? text : ''} />
            }
        </InputWrap>
    )
};

export default ItemWrap;