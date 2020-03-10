import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import firebase from '../Config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {savetoken} from '../Public/Redux/actions/user';

export const HeaderContact = props => {
  const {loading, token} = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState(token);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  return (
    <View style={styles.containerHeader}>
      <Icon
        name="comments"
        solid
        color="#fff"
        size={25}
        style={styles.iconSend}
      />
      <Text style={styles.title}>Haeu Chat</Text>
      <TouchableOpacity onPress={() => setModal(true)}>
        <Icon
          name="list"
          solid
          color="#fff"
          size={25}
          style={styles.iconSend}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#00897b',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  imgProfile: {
    width: 200,
    height: 200,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 100,
  },
  textInput: {
    borderBottomColor: '#acacac',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 1,
    fontSize: 16,
    marginTop: 20,
  },
  containerInput: {
    paddingHorizontal: 30,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 30,
  },
  boxProfile: {
    position: 'relative',
  },
  edit: {
    top: -50,
    left: 90,
  },
  modal: {
    paddingVertical: 30,
  },
});
