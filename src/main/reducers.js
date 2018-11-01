import { combineReducers } from 'redux';
import todoReducer from 'src/todo/todoReducer';

const rootReducer = combineReducers({
    todo: todoReducer,
});

export default rootReducer;