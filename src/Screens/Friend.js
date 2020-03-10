import React, {useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderContact} from '../Components/Headers';
import {useDispatch, useSelector} from 'react-redux';

const Friend = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  const [modal, setModal] = useState(false);
  const [friendRef, setfriendRef] = useState(firebase.database().ref('friend'));

  const getFriends = async () => {
    const data = [];
    setLoading(true);
    let dbRef = firebase.database().ref('users');
    await dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid !== token) {
        data.push(person);
        fillter(data);
      }
    });
  };

  useEffect(() => {
    setUsers([]);
    _getFriends();
  }, []);

  const _addFriend = async data => {
    // await firebase
    //   .database()
    //   .ref('friend')
    //   .child(token)
    //   .child(data.uid)
    //   .on('child_added', value => {
    //     let person = value.val();
    //     if (person) {
    //       console.warn('ada');
    //     } else {
    //       save(data);
    //     }
    //   });
    save(data);
  };

  const save = async data => {
    console.warn('send');
    await firebase
      .database()
      .ref('users')
      .on('child_added', val => {
        let my = val.val();
        my.uid = val.key;
        if (my.uid === token) {
          friendRef
            .child(data.uid)
            .child(token)
            .set({
              uid: token,
              name: my.name,
              avatar: my.avatar,
              status: 1,
            });
        }
      });
    await friendRef
      .child(token)
      .child(data.uid)
      .set({
        uid: data.uid,
        name: data.name,
        avatar: data.avatar,
        status: 0,
      });
  };
  const fillter = data => {
    let dataAfterFilter = data.filter(a => {
      return a.key.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });
    setUsers(dataAfterFilter);
    setLoading(false);
    // console.warn(dataAfterFilter);
  };

  const _getFriends = async () => {
    let dataFriends = [];
    await firebase
      .database()
      .ref('friend')
      .child(token)
      .on('child_added', value => {
        dataFriends.push(value.val());
        setFriends(dataFriends);
      });
  };

  const UserList = ({data}) => {
    return (
      <View style={styles.itemFriend}>
        <Image source={{uri: data.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{data.name}</Text>
        <TouchableOpacity onPress={() => _addFriend(data)} style={styles.addF}>
          <Icon name="user-plus" size={20} color="green" />
        </TouchableOpacity>
      </View>
    );
  };

  const gotochat = data => {
    const uid = data.uid;
    navigation.navigate('ChatRoom', {uid});
    // console.warn(data);
  };
  const confirm = () => {
    alert('oke');
  };

  const FriendList = ({data}) => {
    return (
      <TouchableOpacity
        activeOpacity={data.status === 0 ? 1 : data.status === 1 ? 1 : 0.5}
        onPress={data.status === 2 ? () => gotochat(data) : null}>
        <View style={styles.itemFriend}>
          <Image source={{uri: data.avatar}} style={styles.avatar} />
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.add}>
              {data.status === 0
                ? 'Waiting'
                : data.status === 1
                ? 'Request'
                : 'Friend'}
            </Text>
            {data.status === 1 ? (
              <TouchableOpacity onPress={() => confirm()}>
                <Text style={styles.status}>Confirm</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HeaderContact />
      <View style={styles.container}>
        <View>
          <TextInput placeholder="Ex : haeu chat" style={styles.textInput} />
        </View>
        <View style={styles.friend}>
          {friends.map((friend, index) => {
            return <FriendList key={index} data={friend} />;
          })}
        </View>
      </View>
      <TouchableOpacity style={styles.chatkuy} onPress={() => setModal(true)}>
        <Icon name="user-plus" color="#fff" size={25} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        style={styles.modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <>
          <HeaderContact />
          <View style={styles.container}>
            <View style={styles.sendMessage}>
              <TextInput
                placeholder="Ex : misrudinz@gmail.com"
                style={[styles.textInput, {flex: 1}]}
                onChangeText={e => setKey(e)}
                value={key}
                keyboardType={'email-address'}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.btn} onPress={() => getFriends()}>
                <Icon
                  name="search"
                  solid
                  color="green"
                  size={15}
                  style={styles.iconSend}
                />
              </TouchableOpacity>
            </View>
            <View>
              {!loading ? (
                users ? (
                  <FlatList
                    data={users}
                    style={styles.data}
                    renderItem={({item}) => <UserList data={item} />}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <View style={styles.data}>
                    <Text>No Resutl</Text>
                  </View>
                )
              ) : (
                <ActivityIndicator
                  size="large"
                  color="#285bd4"
                  style={styles.loading}
                />
              )}
            </View>
          </View>
        </>
      </Modal>
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
  textInput: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 5,
    fontFamily: 'roboto',
  },
  sendMessage: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  friend: {
    marginTop: 10,
  },
  itemFriend: {
    flexDirection: 'row',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  data: {
    marginBottom: 40,
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  add: {
    color: 'green',
    marginRight: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  status: {
    color: 'orange',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  addF: {
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
});

export default Friend;
