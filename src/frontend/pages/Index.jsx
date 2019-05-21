import React from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';

const FullPage = loadable(() => import('../components/FullPage'));
const Home = loadable(() => import('./Home'));
const SignIn = loadable(() => import('./SignIn'));
const SignUp = loadable(() => import('./SignUp'));
const QuestionPage = loadable(() => import('./QuestionPage'));
const QuestionPost = loadable(() => import('./QuestionPost'));
const Perfil = loadable(() => import('./Perfil'));

const NotFount = () => (
  <div className="row justify-content-md-center">
    <h3>
      Desculpe, mas não tem nada aqui! <i className="fas fa-sad-tear" />
    </h3>
  </div>
);

const Index = () => (
  <Router>
    <FullPage path="/">
      <SignIn path="login" />
      <Perfil path="usuarios/:usuarioId" />
      <SignUp path="registro-usuario" />
      <Home path="home" />
      <QuestionPage path="perguntas/:id" />
      <QuestionPost path="postar-pergunta" />
      <NotFount default />
    </FullPage>
  </Router>
);

export default Index;
