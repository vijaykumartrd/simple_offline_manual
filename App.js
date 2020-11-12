/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, usEffect, useEffect } from 'react';

import { NetworkProvider, checkInternetConnection } from 'react-native-offline';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App: () => React$Node = () => {
  const [ isConnected, setIsConnected ] = useState( true );
  const [ checking, setChecking ] = useState( false );
  const checkConnection = () => {
    setChecking( true );
    setTimeout( async () => {
      const connected = await checkInternetConnection();
      setIsConnected( connected );
      setChecking( false );
    }, 200 );
  };
  useEffect( checkConnection, [] );
  return (
    <>
      <NetworkProvider>
        <View style={styles.view}>
          <Button title='Check Connection' onPress={checkConnection} />
          {checking ? (
            <Text style={styles.checking}>Checking</Text>
          ) : isConnected ? (
            <Text style={styles.online}>Online</Text>
          ) : (
                <Text style={styles.offline}>Offline</Text>
              )
          }
        </View>
      </NetworkProvider>
    </>
  );
};

const styles = StyleSheet.create( {
  view: {
    justifyContent: 'center',
    flex: 1,
    padding: 40,
  },
  checking: {
    paddingTop: 100,
    color: '#ccc',
    fontSize: 30,
    textAlign: 'center'
  },
  online: {
    paddingTop: 100,
    fontSize: 30,
    textAlign: 'center',
    color: 'green'
  },
  offline: {
    paddingTop: 100,
    fontSize: 30,
    textAlign: 'center',
    color: 'red'
  }
} );

export default App;
