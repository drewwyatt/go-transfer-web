import * as React from 'react';
import { connect } from 'react-redux';
import { ITodo } from '../models';
import { Creators } from '../actions';

const { Todo } = Creators;

export interface AppProps {
    todos: ITodo[]; // TODO
    addTodo(text: string): void;
}

class App extends React.Component<AppProps, void> {
    render(): JSX.Element {
        return (
            <section>
                <h1>Typescript 2 + Redux</h1>
                <fieldset>
                    <legend>Todo List Example</legend>
                    <form onSubmit={this._handleAdd.bind(this)}>
                        <label htmlFor='todo_text'>What do you want to do?</label>
                        <input type='text' name='todo_text' ref='newTodo' />
                        <button type='submit'>Go</button>
                    </form>
                    <br />
                    <hr />
                    <br />
                    {this._todosToList()}
                </fieldset>
            </section>
        );
    }

    private _todosToList(): JSX.Element {
        const { todos } = this.props;
        return <ul>{ todos.map(t => <li key={t.id}>{t.text}</li>) }</ul>;
    }

    private _handleAdd(event: Event): void {
        event.preventDefault();
        const value = this.refs['newTodo']['value']; 
        if (value && value.trim()) {
            this.props.addTodo(value);
            this.refs['newTodo']['value'] = '';
        }
    }
}

function mapStateToProps(state: any): any { // TODO
    return {
        todos: state
    };
}

function mapDispatchToProps(dispatch: any): any { // TODO
    return {
        addTodo(text: string): void {
            dispatch(Todo.addTodo(text));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);