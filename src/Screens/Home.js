import React, {useCallback, useContext, useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import ChatList from '../Components/ChatList';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Components/Header';

const Home = props => {
  const {token} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(token);
  const [keyid, setKeyId] = useState([]);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        firebase
          .database()
          .ref('users/' + uid)
          .update({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            log: 'online',
          });
      },
      error => null,
      {timeout: 20000, maximumAge: 1000},
    );

    getmessage();
  }, []);

  const getmessage = async () => {
    const data = [];
    await firebase
      .database()
      .ref('messages')
      .child(uid)
      .orderByChild('time')
      .on('child_added', val => {
        let dbRef = firebase.database().ref('users/' + val.key);
        dbRef.on('value', val => {
          let person = val.val();
          person.uid = val.key;
          setLoading(false);
          if (val.key !== uid) {
            data.push(person);
            setUsers(data);
            setKeyId(val.key);
          }
        });
      });
    setLoading(false);
  };

  const showRoom = data => {
    props.navigation.navigate('ChatRoom', {uid: data.uid});
    // console.warn(data);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {!isloading ? (
          <FlatList
            data={users}
            renderItem={({item}) => <ChatList data={item} onPress={showRoom} />}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color="#285bd4"
            style={styles.loading}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.chatkuy}
        onPress={() => props.navigation.navigate('Friend')}>
        <Icon name="plus" color="#fff" size={25} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: '50%',
    left: 0,
    right: 0,
  },
  chatkuy: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    backgroundColor: 'green',
    borderRadius: 30,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
