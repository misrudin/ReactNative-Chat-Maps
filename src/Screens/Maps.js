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
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';

const inittialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Maps = () => {
  const {token} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(token);
  const [currenPosition, setCurrentPosition] = useState(inittialState);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getlocation = Geolocation.getCurrentPosition(
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
    getFriends();
    const dataarray = [];
    if (currenPosition.latitude) {
      users.map(us => {
        // console.warn(us.latitude);
        if (us.latitude !== 0) {
          dataarray.push({latitude: us.latitude, longitude: us.longitude});
          setMarkers(dataarray);
        }
      });
      // console.warn(dataarray);
    }
  }, []);

  const getFriends = async () => {
    const data = [];
    setLoading(true);
    let dbRef = firebase.database().ref('users');
    await dbRef.on('child_changed', val => {
      let person = val.val();
      person.uid = val.key;
      setLoading(false);
      if (person.uid !== token) {
        data.push(person);
        setUsers(data);
      }
    });
  };
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
        {markers.map((marker, i) => {
          console.warn(marker);
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          );
          // <Marker coordinate={currenPosition} />;
        })}
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
