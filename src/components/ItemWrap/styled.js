import styled from 'styled-components';

export const InputWrap = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    width: ${ props => props.text ? "150px" : "auto"}
`;

export const Text = styled.textarea`
    width: 150px;
    resize: none;
    box-sizing: border-box;
`;

export const Label = styled.label`
    min-width: 100px;
    padding-right: 10px;
`;