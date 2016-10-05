import * as React from 'react';
import { Button } from 'react-mdl';

export interface ComboFieldProps {
    text: string;
}

export function ComboField({ text }: ComboFieldProps): JSX.Element {
    const styles = {
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
        <div style={styles}>
            <input style={textStyles} type='text' value={text} />
            <Button raised colored ripple style={buttonStyle}>COPY</Button>
        </div>
    );
}