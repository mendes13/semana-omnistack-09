import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import socketio from 'socket.io-client';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

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

interface Booking {
  _id: string;
  date: Date;
  dateFormatted?: string;
  spot: Spot;
  user: User;
  approved: boolean;
}

const List: React.FC = () => {
  const [techs, setTechs] = useState<string[]>([]);

  useEffect(() => {
    async function loadSocket() {
      const user_id = await AsyncStorage.getItem('user');
      const socket = socketio('http://localhost:5000', {
        query: { user_id },
      });

      socket.on('booking_response', (booking: Booking) => {
        const request = {
          ...booking,
          dateFormatted: format(
            new Date(booking.date),
            "dd 'de' MMMM 'de' yyyy, 'às' HH'h' ",
            {
              locale: pt,
            }
          ),
        };

        Alert.alert(
          `Sua reserva em ${request.spot.company} no dia ${
            request.dateFormatted
          } foi ${request.approved ? 'APROVADA' : 'REJEITADA'}`
        );
      });
    }

    loadSocket();
  }, []);

  useEffect(() => {
    async function getTechs() {
      const storagedTechs = await AsyncStorage.getItem('techs');
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    }

    getTechs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default List;
