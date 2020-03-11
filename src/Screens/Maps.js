import React, {useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
  Modal,
  ToastAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';

const Maps = props => {
  const inittialState = {
    latitude: props.route.params.data.latitude,
    longitude: props.route.params.data.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const {token} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(token);
  const [currenPosition, setCurrentPosition] = useState(inittialState);
  const [friendPosition, setFriendPosition] = useState(inittialState);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  // console.warn(props.route.params.data);
  useEffect(() => {
    const usnSubcribe = Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
          ...currenPosition,
          latitude,
          longitude,
        });
      },
      error => ToastAndroid.show(error.message, ToastAndroid.SHORT),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000},
    );
    return () => {
      Geolocation.clearWatch();
      Geolocation.stopObserving();
    };
  }, []);

  return currenPosition.latitude ? (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={friendPosition}>
        <Marker
          pinColor="blue"
          coordinate={currenPosition}
          title={'Your Location'}
        />
        <Marker pinColor="green" coordinate={friendPosition} />
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
