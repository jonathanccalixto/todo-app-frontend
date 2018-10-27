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

        // form events
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        // list events
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        this.refresh();
    }
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';

        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(response => this.setState({
                ...this.state,
                description: description,
                list: response.data
            }));
    }
    handleSearch () {
        this.refresh(this.state.description);
    };
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
             .then(response => this.refresh(this.state.description));
    };
    handleMarkAsDone (todo) {
        axios.put(`${URL}/${todo._id}`, { done: true })
             .then(response => this.refresh(this.state.description));
    };
    handleMarkAsPending (todo) {
        axios.put(`${URL}/${todo._id}`, { done: false })
             .then(response => this.refresh(this.state.description));
    };
    render () {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description={this.state.description}
                          handleChange={this.handleChange}
                          handleAdd={this.handleAdd}
                          handleSearch={this.handleSearch}
                />
                <TodoList list={this.state.list}
                          handleMarkAsDone={this.handleMarkAsDone}
                          handleMarkAsPending={this.handleMarkAsPending}
                          handleRemove={this.handleRemove}
                />
            </div>
        )
    };
}