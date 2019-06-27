import React, { Component } from 'react';
import {
    Wrapper,
    TabsList,
    TabsItem,
    TabsContent,
    Textarea,
    ButtonsWrap,
    Button,
    InputWrap,
    Input,
    Text,
    Label
} from "./styled";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body { margin: 0; }
`;

const ItemWrap = ({ label, type, text }) => {
    return (
        <InputWrap>
            <Label htmlFor={label}>{label}</Label>
            { type === 'textarea' && 
                <Text id={label} /> ||
                <Input id={label} type={type} text={text ? text : ''} />
            }
        </InputWrap>
    )    
};

class App extends Component {
    constructor() {
        super();

        this.state = {
            active: 0,
            isValid: true,
            config: `{
                "formHeading": "Form heading",
                "items": [
                    { "type": "number", "label": "Number input" }
                ],
                "buttons": [
                    { "type": "reset", "label": "Cancel" },
                    { "type": "submit", "label": "Save" }
                ]
            }`
        }
    };

    switchTab(tab) {
        this.setState({
            active: tab
        });
    };

    handleTextarea(val) {
        this.setState({
            config: val
        });

        try {
            JSON.parse(val);
            this.setState({
                isValid: true
            });
        } catch (e) {
            this.setState({
                isValid: false
            });
            console.log(e);
            return false;
        }
    }

    generateForm() {
        const config = JSON.parse(this.state.config);

        const getInput = (type, label, key) => {
            const inputs = {
                'number': { input: 'number', label: label ? label : 'Number', isTextfield: true },
                'text': { input: 'text', label: label ? label : 'Text input', isTextfield: true },
                'date': { input: 'date', label: label ? label : 'Date input', isTextfield: true },
                'checkbox': { input: 'checkbox', label: label ? label : 'Checkbox input', isTextfield: false },
                'radio': { input: 'radio', label: label ? label : 'Radio input', isTextfield: false },
                'textarea': { input: 'textarea', label: label ? label : 'Textarea', isTextfield: true },
                'default': <p key={key}>Unknown input type</p>
            };

            return inputs[type] 
                ? <ItemWrap 
                    key={key} 
                    label={inputs[type].label} 
                    type={inputs[type].input} 
                    text={inputs[type].isTextfield ? 'text' : ''} 
                    /> 
                : inputs['default'];
        }

        let items, buttons;

        if (Array.isArray(config.items)) {
            items = config.items.map((item, key) => {
                const { type, label } = item;

                return getInput(type, label, key);
            });
        } else {
            return <p>Is not array of items</p>;
        }

        if (Array.isArray(config.buttons)) {
            buttons = config.buttons.map((button, key) => {
                const type = button.type;

                if (type === 'reset') {
                    return <Button type="reset" key={key}>{ button.label }</Button>
                } else if (type === 'submit') {
                    return <Button type="submit" key = { key }>{ button.label }</Button>
                } else {
                    return <p key={key}>Unknown button type</p>
                }
            });
        }
        
        return (
            <fieldset>
                <legend>{ config.formHeading }</legend>

                { items }

                <ButtonsWrap>
                    { buttons }
                </ButtonsWrap>
            </fieldset>
        );      
    }

    render() {
        const { active, config, isValid } = this.state;
        let formattedJSON;

        if (isValid) {
            formattedJSON = JSON.stringify(JSON.parse(config), undefined, 2);
        }

        return (
            <Wrapper>
                <GlobalStyle />
                <TabsList>
                    <TabsItem onClick={() => this.switchTab(0)} type="button" active={active === 0 ? 'active' : ''}>Config</TabsItem>
                    <TabsItem type="button" active={active === 1 ? 'active' : ''}>Result</TabsItem>
                </TabsList>

                <TabsContent active={active === 0 ? 'active' : ''}>
                    <Textarea value={formattedJSON} onChange={e => this.handleTextarea(e.target.value)} />
                    <ButtonsWrap>
                        <Button type="button" onClick={() => {this.switchTab(1)}}>Apply</Button>
                    </ButtonsWrap>
                </TabsContent>

                <TabsContent active={active === 1 ? 'active' : ''}>
                    <form method="POST" action="#">
                        { isValid && this.generateForm() || <p>Invalid JSON-format</p> }
                    </form>
                </TabsContent>
            </Wrapper>
        )
    };
}

export default App;