import React, { useState, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import { Thumbnail } from './styles';
import Form from '../../styles/components/Form';
import camera from '../../assets/camera.svg';

const New: React.FC<RouteComponentProps> = ({ history }) => {
  const [company, setCompany] = useState<string>('');
  const [techs, setTechs] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<any>(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData();
    const user_id = localStorage.getItem('user');

    form.append('thumbnail', thumbnail);
    form.append('company', company);
    form.append('techs', techs);
    form.append('price', price);

    await api.post('/spots', form, {
      headers: { user_id },
    });

    history.push('/dashboard');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Thumbnail preview={preview}>
        <img src={camera} alt="Select img" />
        <input
          type="file"
          name=""
          id=""
          onChange={e => {
            if (e.target.files !== null) {
              setThumbnail(e.target.files[0]);
            }
          }}
        />
      </Thumbnail>

      <label htmlFor="company">EMPRESA</label>
      <input
        id="company"
        type="text"
        value={company}
        onChange={e => setCompany(e.target.value)}
        placeholder="Sua empresa incrível"
      />

      <label htmlFor="techs">
        TECNOLOGIAS* <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        type="text"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        placeholder="Quais tecnologias usam?"
      />

      <label htmlFor="price">
        VALOR DA DIÁRIA* <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        type="text"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Valor cobrado por dia"
      />

      <button type="submit">Cadastrar</button>
    </Form>
  );
};

export default New;
