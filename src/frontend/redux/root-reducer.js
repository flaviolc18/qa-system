import { combineReducers } from 'redux';

import { app } from './app.redux';
import { perguntas } from './perguntas.redux';
import { respostas } from './respostas.redux';
import { usuarios } from './usuarios.redux';

export default combineReducers({ app, perguntas, respostas, usuarios });
