import * as React from 'react';
import * as ReactDOM from 'react-dom';

class App extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <main>
                <h1>Typescript 2 + Redux</h1>
                <p>This is a react app.</p>
            </main>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));