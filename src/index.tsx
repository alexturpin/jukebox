import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { init } from './api/youtube';

ReactDOM.render(<App />, document.getElementById('root'));
init();
