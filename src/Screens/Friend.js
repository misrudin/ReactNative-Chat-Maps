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
  const [name, setName] = useState('');
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
    _getFriends();
  }, []);

  const _addFriend = async data => {
    save(data);
  };

  const save = async data => {
    let updates = {};
    let person = {
      status: 0,
    };
    let person2 = {
      status: 1,
    };
    updates['friend/' + token + '/' + data.uid] = person;
    updates['friend/' + data.uid + '/' + token] = person2;
    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        ToastAndroid.show('Send request', ToastAndroid.SHORT);
      });
  };
  const fillter = data => {
    if (key) {
      let dataAfterFilter = data.filter(a => {
        return a.key.toLowerCase().indexOf(key.toLowerCase()) !== -1;
      });
      setUsers(dataAfterFilter);
      setLoading(false);
    } else {
      setUsers([]);
      setLoading(false);
    }
    // console.warn(dataAfterFilter);
  };

  const _getFriends = async () => {
    let dataFriends = [];
    await firebase
      .database()
      .ref('friend')
      .child(token)
      .on('child_added', value => {
        let person = value.key;
        firebase
          .database()
          .ref('users')
          .child(person)
          .on('value', val => {
            let friendsme = val.val();
            friendsme.status = value.val().status;
            friendsme.uid = value.key;
            dataFriends.push(friendsme);
            setFriends(dataFriends);
          });
      });
  };

  const UserList = ({data}) => {
    return (
      <View style={styles.itemFriend}>
        <Image source={{uri: data.avatar}} style={styles.avatar} />
        <Text style={styles.name}>{data.name}</Text>
        <TouchableOpacity onPress={() => _addFriend(data)} style={styles.addF}>
          <Icon name="user-plus" size={20} color="#ff971d" />
        </TouchableOpacity>
      </View>
    );
  };

  const gotochat = data => {
    // const uid = data.uid;
    navigation.navigate('ChatRoom', {data});
    // console.warn(data);
  };
  const confirm = data => {
    // alert(data.uid);
    firebase
      .database()
      .ref('friend/' + token)
      .child(data.uid)
      .update({
        status: 2,
      });
    firebase
      .database()
      .ref('friend/' + data.uid)
      .child(token)
      .update({
        status: 2,
      });
    _getFriends();
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
              <TouchableOpacity onPress={() => confirm(data)}>
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
      <HeaderContact title={'Friend List'} />
      <View style={styles.container}>
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
          <HeaderContact title={'Get Friend'} />
          <View style={styles.container}>
            <View style={styles.sendMessage}>
              <TextInput
                placeholder="Ex : misrudinz@gmail.com"
                style={[styles.textInput, {flex: 1}]}
                onChangeText={e => setKey(e)}
                onSubmitEditing={() => getFriends()}
                value={key}
                keyboardType={'email-address'}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.btn} onPress={() => getFriends()}>
                <Icon
                  name="search"
                  solid
                  color="#ff971d"
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
                  color="#ff971d"
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
    backgroundColor: '#ff971d',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,

    elevation: 4,
  },
  textInput: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ffe8d6',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 5,
    fontFamily: 'roboto',

    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,

    elevation: 2,
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
    borderWidth: 2,
    borderColor: '#ffe8d6',

    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,

    elevation: 2,
  },
  friend: {
    marginTop: 10,
  },
  itemFriend: {
    flexDirection: 'row',
    marginBottom: 5,
    padding: 10,
    borderRadius: 1,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#acacac',
    shadowRadius: 3,
    shadowOpacity: 0.2,

    elevation: 1,
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
    color: '#1b262c',
    alignSelf: 'center',
  },
  add: {
    color: '#ed8240',
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
