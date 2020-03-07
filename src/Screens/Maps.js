import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Maps = () => {
  const [markers, setMarkers] = useState([
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: 'Udin',
    },
    {
      latitude: 37.78625,
      longitude: -122.4335,
      title: 'Bapa',
    },
    {
      latitude: 37.78628,
      longitude: -122.4365,
      title: 'Ema',
    },
    {
      latitude: 37.78825,
      longitude: -122.4335,
      title: 'Adek',
    },
  ]);

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => {
          return (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});

export default Maps;
