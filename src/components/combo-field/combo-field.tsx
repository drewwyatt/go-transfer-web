import * as React from 'react';
import { Button, Tooltip } from 'react-mdl';

export interface ComboFieldProps {
    text: string;
    styles?: React.CSSProperties;
}

export interface ComboFieldState {
    btnText: string;
}

// declare var Clipboard: any;

const DEFAULT_BUTTON_TEXT = 'COPY';

export class ComboField extends React.Component<ComboFieldProps, ComboFieldState> {
    componentWillMount(): void {
        this.setState({ btnText: DEFAULT_BUTTON_TEXT });
    }
    
    render(): JSX.Element {
        const { text, styles } = this.props;
        const { btnText } = this.state;
        
        const wrapStyles = {
            height: '36px',
            boxSizing: 'border-box',
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto'
        };

        const textStyles = {
            height: '36px',
            padding: '0 16px',
            boxSizing: 'border-box',
            border: '1px solid rgb(63,81,181)',
            width: 'calc(100% - 90px)',
            maxWidth: '600px',
            float: 'left'
        };  

        const buttonStyle = {
            width: '90px',
            float: 'right',
            background: 'rgb(63, 81, 181)',
            color: '#fff'
        };

        const btnId = `combo-btn-${new Date().getMilliseconds()}`;
        const fieldId = `combo-field-${new Date().getMilliseconds()}`;

        return (
            <div style={Object.assign({}, wrapStyles, styles || {})}>
                <input style={textStyles} id={fieldId} type='text' value={text} onChange={noop => noop} />
                { /* <Button raised colored ripple style={buttonStyle}>COPY</Button> */ }
                <button onClick={this._onButtonClick.bind(this)} data-clipboard-target={`#${fieldId}`} style={buttonStyle} id={btnId} className='copy-btn mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored'>{btnText}</button>
            </div>
        );
    }

    private _onButtonClick(): void {
        console.log('_onButtonClick');
        this._setTextTo('COPIED!');
        setTimeout(() => this._setTextTo(DEFAULT_BUTTON_TEXT), 3000);
    }

    private _setTextTo(btnText: string): void {
        console.log('_setTextTo', btnText);
        this.setState(Object.assign({}, this.state, {
            btnText
        }));
    }
}