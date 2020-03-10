import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const inittialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Maps = () => {
  const [currenPosition, setCurrentPosition] = useState(inittialState);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position));
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
          ...currenPosition,
          latitude,
          longitude,
        });
      },
      error => alert(error.message),
      {timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return currenPosition.latitude ? (
    <>
      <View style={styles.contain}>
        <TextInput placeholder="Ex : @haeuChat_" style={styles.textInput} />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsTraffic
        showsCompass
        initialRegion={currenPosition}>
        <Marker coordinate={currenPosition} />
      </MapView>
    </>
  ) : (
    <ActivityIndicator size="large" style={styles.loading} />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
  },
  loading: {
    flex: 1,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  textInput: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontFamily: 'roboto',
  },
  contain: {
    backgroundColor: 'green',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

export default Maps;
