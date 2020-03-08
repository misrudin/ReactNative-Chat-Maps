import React, {useCallback, useContext, useState, useEffect} from 'react';
import app from '../Config/Firebase';
import 'firebase/firestore';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import ChatList from '../Components/ChatList';

const Home = props => {
  const [users, setUsers] = useState([]);
  const name = 'udin';

  const showRoom = () => {
    props.navigation.navigate('ChatRoom');
  };

  useEffect(() => {
    const db = app.firestore();
    const unsubscribe = db
      .collection('users')
      .where('name', '==', name)
      .onSnapshot(snapshot => {
        const userData = [];
        snapshot.forEach(doc => userData.push({...doc.data()}));
        setUsers(userData[0].friend);
      });
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
