import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  AsyncStorage,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState<string[]>([]);

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
}

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
