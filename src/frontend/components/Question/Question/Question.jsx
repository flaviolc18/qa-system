import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { getUsuariosByFilter, loadUsuarioPergunta } from '../../../redux/usuarios.redux';
import { loadPergunta, getPergunta, editPergunta, removePergunta } from '../../../redux/perguntas.redux';

import { Post } from '../../Post';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      titulo: '',
    };

    this.onFinishEdit = this.onFinishEdit.bind(this);
    this.onRemovePergunta = this.onRemovePergunta.bind(this);
  }

  componentDidMount() {
    this.props.loadPergunta({ id: this.props.id }).then(({ elements: [{ titulo }] }) => {
      this.setState(prevState => ({ ...prevState, titulo }));
    });
    this.props.loadUsuarioPergunta({ perguntaId: this.props.id });
  }

  renderTitulo() {
    return this.state.isEditing ? (
      <div>
        <div className="pb-2">
          <input
            className="input-text"
            placeholder="Título"
            name="titulo"
            onChange={e => {
              const titulo = e.target.value;
              if (titulo.length === 0) {
                alert('Título vazio não é permitido!');
                return;
              }
              this.setState(prevState => ({ ...prevState, titulo }));
            }}
            type="text"
            value={this.state.titulo}
          />
        </div>
      </div>
    ) : (
      <div>
        <h2>{this.props.pergunta.titulo}</h2>
        <hr className="colored-line" />
      </div>
    );
  }

  onFinishEdit(editedText) {
    this.props
      .editPergunta({ id: this.props.pergunta._id }, { titulo: this.state.titulo, descricao: editedText })
      .then(() => {
        this.setState({ isEditing: false });
      });
  }

  onRemovePergunta(query) {
    this.props.removePergunta(query).then(() => navigate('/'));
  }

  render() {
    if (!this.props.pergunta || !this.props.usuario) {
      return (
        <div>
          <div
            style={{
              width: '320px',
              height: '40px',
              backgroundColor: 'rgb(240,240,240)',
              marginBottom: '10px',
            }}
          />
          <div style={{ borderBottom: '1px solid rgb(240,240,240)', width: '100%' }} />
          <div className="row p-0 m-0">
            <div className="col-md-auto p-0 m-3">
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: 'rgb(240,240,240)',
                  borderRadiur: '10px',
                  margin: '10px',
                }}
              />
            </div>
            <div className="col p-0 m-0">
              <div
                style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: 'rgb(240,240,240)',
                  borderRadiur: '10px',
                  margin: '10px',
                }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.renderTitulo()}
        <Post
          onRemovePost={this.onRemovePergunta}
          onFinishEdit={this.onFinishEdit}
          loadPost={this.props.loadPergunta}
          post={this.props.pergunta}
          user={this.props.usuario}
          isEditing={this.state.isEditing}
          onEditClick={() => this.setState({ isEditing: true })}
        />
      </div>
    );
  }
}

Question.propTypes = {
  editPergunta: PropTypes.func,
  removePergunta: PropTypes.func,
  loadPergunta: PropTypes.func,
  loadUsuarioPergunta: PropTypes.func,
  pergunta: PropTypes.object,
  usuario: PropTypes.object,
  id: PropTypes.string,
};

export default connect(
  (state, ownProps) => {
    return {
      pergunta: getPergunta(state, ownProps.id),
      usuario: getUsuariosByFilter(state, { perguntaId: ownProps.id })[0],
    };
  },
  {
    loadUsuarioPergunta,
    loadPergunta,
    editPergunta,
    removePergunta,
  }
)(Question);
