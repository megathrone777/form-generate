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

class App extends Component {
    constructor() {
        super();

        this.state = {
            active: 0,
            isValid: true,
            config: `{
                "formHeading": "Form heading",
                "items": [
                    { "type": "text", "label": "Text input" }
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

        if (Array.isArray(config.items)) {  // Could be lodash
            items = config.items.map((item, key) => {
                const type = item.type;

                if (type === 'number') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Number'}</Label>
                            <Input id={item.label} type="number" text />
                        </InputWrap>
                    );
                } else if (type === 'text') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Text input'}</Label>
                            <Input id={item.label} type="text" text />
                        </InputWrap>
                    );
                } else if (type === 'textarea') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Textarea'}</Label>
                            <Text id={item.label} />
                        </InputWrap>
                    );
                } else if (type === 'checkbox') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Checkbox'}</Label>
                            <Input id={item.label} type="checkbox" />
                        </InputWrap>
                    );
                } else if (type === 'date') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Date'}</Label>
                            <Input id={item.label} type="date" text />
                        </InputWrap>
                    );
                } else if (type === 'radio') {
                    return (
                        <InputWrap key={key}>
                            <Label htmlFor={item.label}>{item.label ? item.label : 'Radio'}</Label>
                            <Input id={item.label} type="radio" />
                        </InputWrap>
                    );
                }
                else {
                    return <p key={key}>Unknown input type</p>;
                }
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
            formattedJSON = JSON.stringify(JSON.parse(config), undefined, 2);  // Could be some module
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