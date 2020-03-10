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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Components/Header';
import {useDispatch, useSelector} from 'react-redux';

const Friend = ({navigation}) => {
  const {token} = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState('');
  const [modal, setModal] = useState(false);

  const getFriends = async () => {
    const data = [];
    setLoading(true);
    let dbRef = firebase.database().ref('users');
    await dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      setLoading(false);
      if (person.uid !== token) {
        data.push(person);
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    setUsers([]);
    getFriends();
  }, []);

  const showProfile = data => {
    alert(data.name);
  };

  const UserList = ({data}) => {
    return (
      <TouchableOpacity onPress={() => showProfile(data)}>
        <View style={styles.itemFriend}>
          <Image source={{uri: data.avatar}} style={styles.avatar} />
          <Text>{data.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <TextInput placeholder="Ex : haeu chat" style={styles.textInput} />
        </View>
        <View style={styles.friend}>
          <Text>haoow</Text>
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
          <Header />
          <View style={styles.container}>
            <View style={styles.sendMessage}>
              <TextInput
                placeholder="Ex : @haeuChat_"
                style={[styles.textInput, {flex: 1}]}
              />
              <TouchableOpacity style={styles.btn}>
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
                <FlatList
                  data={users}
                  style={styles.data}
                  renderItem={({item}) => <UserList data={item} />}
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
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  data: {
    marginBottom: 40,
    marginTop: 10,
  },
});

export default Friend;
