import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {description: '', list: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.refresh();
    }
    refresh() {
        axios.get(`${URL}?sort=-createdAt`)
            .then(response =>  this.setState({
                ...this.state,
                description: '',
                list: response.data
            }));
    }
    handleChange (event) {
        this.setState({
            ...this.state,
            description: event.target.value
        });
    };
    handleAdd () {
        const description = this.state.description;
        axios.post(URL, { description })
             .then(response => this.refresh());
    };
    handleRemove (todo) {
        axios.delete(`${URL}/${todo._id}`)
             .then(response => this.refresh());
    };
    render () {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                          handleChange={this.handleChange}
                          handleAdd={this.handleAdd}
                />
                <TodoList list={this.state.list}
                          handleRemove={this.handleRemove}
                />
            </div>
        )
    };
}