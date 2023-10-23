import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import {range} from 'mathjs';
import RNFS from 'react-native-fs';
const {ParabolicFunction, SinusoidFunction} = require('../models/function.js');
const {
  MidpointRule,
  TrapezoidRule,
  SimpsonRule,
} = require('../models/integralRule.js');
import Plot from './plot.js';
import ContinueBtn from './continueBtn.js';
import Toast from 'react-native-toast-message';

const initFunction = (functionChoice, coefs) => {
  switch (functionChoice) {
    case 'parabolic':
      return new ParabolicFunction(coefs);
    case 'sinusoid':
      return new SinusoidFunction(coefs);
  }
};

const IntegralCalculator = ({route, navigation}) => {
  const [func, setFunc] = useState();
  const [results, setResults] = useState(null);
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([]);

  useEffect(() => {
    const {functionChoice, interval, intervalAmount, coefs} = route.params;

    const currentFunction = initFunction(functionChoice, coefs);
    setFunc(currentFunction);
    setResults([
      [
        'midpoint',
        ...currentFunction.calculateIntegral(
          new MidpointRule(interval, intervalAmount),
        ),
      ],
      [
        'trapezoid',
        ...currentFunction.calculateIntegral(
          new TrapezoidRule(interval, intervalAmount),
        ),
      ],
      [
        'simpson',
        ...currentFunction.calculateIntegral(
          new SimpsonRule(interval, intervalAmount),
        ),
      ],
    ]);
  }, [route]);

  useEffect(() => {
    const {interval, intervalAmount} = route.params;
    if (func && interval) {
      const step = (interval.end - interval.start) / intervalAmount;
      const xVal = range(interval.start, interval.end + step, step).toArray();

      setXValues(xVal);
      setYValues(xVal.map(x => func.fX(x)));
    }
  }, [func, route]);

  const readFile = async path => {
    const response = await RNFS.readFile(path);
    console.log(response);
  };

  const downloadCoefs = async () => {
    try {
      const customFilePath = RNFS.DocumentDirectoryPath + '/' + Date.now();
      const coefs = route.params.coefs;

      await RNFS.writeFile(customFilePath, JSON.stringify(coefs), 'utf8');
      console.log('written to file', customFilePath);

      Toast.show({
        type: 'success',
        text1: 'Sucess',
        text2: `File is successfully downloaded to ${customFilePath}`,
      });

      readFile(customFilePath);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Error occured during file downloading: ${error}`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your function is: </Text>
      {route.params.functionChoice === 'parabolic' ? (
        <Text style={styles.funcInfo}>
          {route.params.coefs.a}*x^2 + {route.params.coefs.b}*x +
          {route.params.coefs.c}
        </Text>
      ) : (
        <Text style={styles.funcInfo}>
          {route.params.coefs.a}*sin({route.params.coefs.b}*x +
          {route.params.coefs.c}) + d
        </Text>
      )}
      <Text style={styles.title}>Interval:</Text>
      <Text style={styles.funcInfo}>
        [{route.params.interval.start}, {route.params.interval.end}]
      </Text>
      <Text style={styles.title}>Steps count:</Text>
      <Text style={styles.funcInfo}>{route.params.intervalAmount}</Text>
      {results && (
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title>Rule</DataTable.Title>
            <DataTable.Title>Result</DataTable.Title>
            <DataTable.Title>Exec Time</DataTable.Title>
          </DataTable.Header>

          {results.map(result => (
            <DataTable.Row key={result}>
              {result.map(innerRes => (
                <DataTable.Cell key={innerRes} textStyle={styles.cell}>
                  {innerRes}
                </DataTable.Cell>
              ))}
            </DataTable.Row>
          ))}
        </DataTable>
      )}
      <Text>
        {xValues.length && yValues.length && (
          <Plot xValues={xValues} yValues={yValues} />
        )}
      </Text>
      <View style={styles.btnSection}>
        <TouchableOpacity style={styles.btnContainer} onPress={downloadCoefs}>
          <Text style={styles.btnText}>Download</Text>
        </TouchableOpacity>
        <ContinueBtn
          width="46%"
          text="About me"
          screenName={'Executor data'}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 76,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 25,
    marginBottom: 8,
    textAlign: 'center',
  },
  funcInfo: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    marginBottom: 16,
  },
  cell: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  table: {
    marginBottom: 10,
  },
  btnContainer: {
    width: '46%',
    height: 50,
    borderColor: '#3CA1FF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginRight: 14,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#222222',
    fontSize: 18,
  },
  btnSection: {
    flexDirection: 'row',
    marginTop: 12,
  },
});

export default IntegralCalculator;
