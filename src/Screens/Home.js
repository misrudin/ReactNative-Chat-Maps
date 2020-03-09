import React, {useCallback, useContext, useState, useEffect} from 'react';
import app from '../Config/Firebase';
import 'firebase/firestore';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import ChatList from '../Components/ChatList';

const Home = props => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const email = 'misrudinz@gmail.com';

  const showRoom = () => {
    props.navigation.navigate('ChatRoom');
  };

  const fetchUser = () => {
    friends.map(e => {
      const db = app.firestore();
      const unsubscribe = db
        .collection('users')
        .where('email', '==', e)
        .onSnapshot(snapshot => {
          const userData = [];
          snapshot.forEach(doc => console.warn(doc.data()));
          // userData.push({...doc.data()})
          // setUsers(userData);
          // console.warn(userData);
        });
      return unsubscribe;
    });
  };

  useEffect(() => {
    const db = app.firestore();
    const unsubscribe = db
      .collection('users')
      .where('email', '==', email)
      .onSnapshot(snapshot => {
        const Friend = [];
        snapshot.forEach(doc => Friend.push(doc.data().friend));
        // userData.push({...doc.data()})
        setFriends(Friend);
        // console.warn(friends);
      });
    fetchUser();
    return unsubscribe;
  }, []);
  return (
    <>
      <View style={styles.container}>
        {users ? (
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
