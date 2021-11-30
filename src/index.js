import React from 'react';
import ReactDOM from 'react-dom';
import { CalendarApp } from './CalendarApp';
// import thunk from "redux-thunk" 
        
// const store = createStore(rootReducer, applyMiddleware(thunk));
import './styles.css';

ReactDOM.render(
    <CalendarApp />,
  document.getElementById('root')
);
