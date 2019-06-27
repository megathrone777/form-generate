import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: #eee;
    margin: 0 auto;
    padding: 10px;   
`;

export const TabsList = styled.div`
    display: flex;
`;

export const TabsItem = styled.button`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    background-color: ${ props => props.active ? "white" : "grey" }
    
    &:focus {
        outline: none;
    }
    
    &:last-of-type {
        margin-right: 0;
    }
`;

export const TabsContent = styled.div`
    display: ${ props => props.active ? "block" : "none" }
    min-height: 300px;
    padding: 10px 0;
`;

export const Textarea = styled.textarea`
    width: 100%;
    resize: none;
    box-sizing: border-box;
    padding: 10px; 
    min-height: 320px;
`;

export const ButtonsWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Button = styled.button`
    cursor: pointer;
    border: 1px solid grey;
    padding: 2px 5px;
    margin-left: 10px;
`;