import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import Form from '../../styles/components/Form';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await api.post('sessions', { email });

    localStorage.setItem('user', response.data._id);

    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre
        <strong> talentos</strong> para sua empresa
      </p>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor e-mail"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <button type="submit">Entrar</button>
      </Form>
    </>
  );
};

export default Login;
