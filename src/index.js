import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CononAppTest } from './CononAppTest';
import './styles/style.scss'

ReactDOM.render(
  <CononAppTest />,
  document.getElementById('root')
);

