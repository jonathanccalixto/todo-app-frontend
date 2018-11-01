import React from 'react';

import PageHeader from 'src/template/pageHeader';
import TodoForm from 'src/todo/todoForm';
import TodoList from 'src/todo/todoList';

export default props => (
    <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <TodoForm />
        <TodoList />
    </div>
);