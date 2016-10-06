import * as React from 'react';
import { Button } from 'react-mdl';

export interface ComboFieldProps {
    text: string;
    styles?: React.CSSProperties;
}

export function ComboField({ text, styles }: ComboFieldProps): JSX.Element {
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
        width: 'calc(100% - 72px)',
        maxWidth: '600px',
        float: 'left'
    };  

    const buttonStyle = {
        width: '72px',
        float: 'right'
    };

    return (
        <div style={Object.assign({}, wrapStyles, styles || {})}>
            <input style={textStyles} type='text' value={text} onChange={noop => noop} />
            <Button raised colored ripple style={buttonStyle}>COPY</Button>
        </div>
    );
}