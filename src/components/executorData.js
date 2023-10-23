import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import myPhoto from '../../assets/icons/myphoto1.jpg';

const ExecutorData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Executor data</Text>
      <Image source={myPhoto} style={styles.photo} />
      <Text style={styles.data}>Olena Rak</Text>
      <Text style={styles.data}>TTP-41</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 25,
    marginBottom: 24,
    textAlign: 'center',
  },
  photo: {
    height: 395,
    width: '100%',
    marginVertical: 20,
    marginBottom: 12,
  },
  data: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    marginTop: 8,
  },
});

export default ExecutorData;
