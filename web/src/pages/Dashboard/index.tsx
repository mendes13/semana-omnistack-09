import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Notifications,
  AcceptButton,
  RejectButton,
  SpotList,
  Header,
} from './styles';
import Button from '../../styles/components/Button';

interface Spot {
  company: string;
  price: number;
  techs: Array<string>;
  _id: string;
  thumbnail_url: string;
}

interface User {
  email: string;
}

interface Request {
  _id: string;
  date: Date;
  dateFormatted?: string;
  spot: Spot;
  user: User;
}

const Dashboard: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  const user_id = localStorage.getItem('user');

  const socket = useMemo(
    () =>
      socketio('http://localhost:5000', {
        query: { user_id },
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on('booking_request', (data: Request) => {
      const request = {
        ...data,
        dateFormatted: format(
          new Date(data.date),
          "dd 'de' MMMM 'de' yyyy, 'às' HH'h' ",
          {
            locale: pt,
          }
        ),
      };

      setRequests([...requests, request]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/dashboard', {
        headers: { user_id },
      });

      setSpots(response.data);
    }

    loadSpots();
  }, [setSpots, user_id]);

  async function handleAccept(id: string) {
    await api.post(`bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id: string) {
    await api.post(`bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <Notifications>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para a data
              <strong> {request.dateFormatted}</strong>
            </p>
            <AcceptButton
              type="button"
              onClick={() => handleAccept(request._id)}
            >
              ACEITAR
            </AcceptButton>
            <RejectButton
              type="button"
              onClick={() => handleReject(request._id)}
            >
              REJEITAR
            </RejectButton>
          </li>
        ))}
      </Notifications>

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
