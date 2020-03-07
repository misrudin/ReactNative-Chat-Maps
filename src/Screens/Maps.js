import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
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
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      showsUserLocation
      showsTraffic
      showsCompass
      initialRegion={currenPosition}>
      <Marker coordinate={currenPosition}>
        <Text>i</Text>
      </Marker>
    </MapView>
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
});

export default Maps;
