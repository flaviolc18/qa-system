import { actionsFactory, reducerFactory, gettersFactory } from './creators/factory';

const context = 'perguntas';

let loadPerguntaURL = filters => '/api/perguntas/' + filters.id;
let loadPerguntasUsuarioURL = filters => '/api/perguntas/usuarios/' + filters.usuarioId;
let loadPerguntasTrendingURL = () => '/api/perguntas/trending';
let postPerguntaURL = () => '/api/perguntas';
let editPerguntaURL = filters => '/api/perguntas/' + filters.id;
let deletePerguntaURL = filters => '/api/perguntas/' + filters.id;
let searchPerguntaURL = filters => '/api/perguntas/search?' + filters.query;
let actions = actionsFactory({
  context,
  buildURLs: {
    loadOneURLs: [loadPerguntaURL, loadPerguntasUsuarioURL, loadPerguntasTrendingURL, searchPerguntaURL],
    createOneURLs: [postPerguntaURL],
    editOneURLs: [editPerguntaURL],
    removeOneURLs: [deletePerguntaURL],
  },
});

let getters = gettersFactory({ context });

export const getPergunta = getters.getOneById;
export const getPerguntaByFilters = getters.getByFilters;
export const getPerguntaLoadingState = getters.getLoadingState;

export const loadPergunta = actions.load[0];
export const searchPergunta = actions.load[3];

export const loadPerguntasUsuario = actions.load[1];
export const loadPerguntasTrending = actions.load[2];

export const postPergunta = actions.create[0];
export const editPergunta = actions.edit[0];
export const removePergunta = actions.remove[0];

export const perguntas = reducerFactory({ context });
