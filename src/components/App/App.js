import React, { Component } from 'react';
import {
    Wrapper,
    TabsList,
    TabsItem,
    TabsContent,
    Textarea,
    ButtonsWrap,
    Button
} from "./styled";
import ItemWrap from '../ItemWrap';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body { margin: 0; }
`;

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
        let items, buttons;

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
        };

        const getButton = (type, label, key) => {
            const buttons = {
                'reset': { button: 'reset', label: label ? label : 'Reset' },
                'submit': { button: 'submit', label: label ? label : 'Submit' },
                'default': <Button type="button" key={key}>Simple button</Button>
            };

            return buttons[type]
                ? <Button 
                    key={key}
                    type={buttons[type].button}>                    
                        {buttons[type].label}
                    </Button>
                : buttons['default'];
        }

        if (Array.isArray(config.items)) {
            items = config.items.map((item, key) => { // Return form inputs
                const { type, label } = item;

                return getInput(type, label, key);
            });
        } else {
            return <p>Is not array of buttons</p>;
        }

        if (Array.isArray(config.buttons)) {
            buttons = config.buttons.map((button, key) => {  // Return form buttons
                const { type, label } = button;

                return getButton(type, label, key);
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