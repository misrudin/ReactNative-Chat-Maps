import React, {useCallback, useContext, useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ChatList from '../Components/ChatList';
import Geolocation from '@react-native-community/geolocation';

const Home = props => {
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(null);
  const [keyid, setKeyId] = useState('');
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user != null) {
      setUid(user.uid);
    }
    Geolocation.getCurrentPosition(
      position => {
        firebase
          .database()
          .ref('users/' + user.uid)
          .update({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            log: 'online',
          });
      },
      error => Alert.alert(error.message),
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
        // console.log('val id', val.key);

        let dbRef = firebase.database().ref('users/' + val.key);

        dbRef.on('value', val => {
          // console.log(val.val());
          let person = val.val();
          setLoading(false);
          if (val.key !== uid) {
            data.push(person);
            setUsers(data);
            setKeyId(val.key);
            console.log(data);
          }
        });
      });
    setLoading(false);
  };

  const showRoom = () => {
    props.navigation.navigate('ChatRoom', {uid: keyid});
  };

  return (
    <>
      <View style={styles.container}>
        {/* {isloading ? ( */}
        <FlatList
          data={users}
          renderItem={({item}) => <ChatList data={item} onPress={showRoom} />}
          keyExtractor={item => item.toString()}
          showsVerticalScrollIndicator={false}
        />
        {/* ) : (
          <ActivityIndicator
            size="large"
            color="#285bd4"
            style={styles.loading}
          />
        )} */}
      </View>
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
});
export default Home;
