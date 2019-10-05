import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { SpotList, Header } from './styles';
import Button from '../../styles/components/Button';

interface Spot {
  company: string;
  price: number;
  techs: Array<string>;
  _id: string;
  thumbnail_url: string;
}

const Dashboard: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }

    loadSpots();
  }, [setSpots]);

  return (
    <>
      <SpotList>
        {spots.map(spot => (
          <li key={spot._id}>
            <Header bg={spot.thumbnail_url} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </SpotList>

      <Link to="/new">
        <Button type="button">Cadastrar novo spot</Button>
      </Link>
    </>
  );
};
export default Dashboard;
