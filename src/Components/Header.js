import React, {useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {savetoken, register} from '../Public/Redux/actions/user';

const Header = props => {
  const {loading, token} = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState(token);
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState();
  const dispatch = useDispatch();

  const _logout = () => {
    Alert.alert(
      'Confirm Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => logoutoke()},
      ],
      {cancelable: false},
    );
  };

  const logoutoke = () => {
    AsyncStorage.removeItem('Token');
    dispatch(savetoken(null));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    let curr = firebase.auth().currentUser;
    if (curr != null) {
      setEmail(curr.email);
    }
    setTimeout(() => {
      firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', val => {
          setAvatar(val.val().avatar);
          setName(val.val().name);
          setData(val.val());
        });
    }, 10);
  };

  const showImage = () => {
    const options = {
      title: 'Add product image',
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      noData: true,
      cropping: true,
      storageOptions: {
        skipBackup: true,
        path: 'posApp',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response);
      }
    });
  };

  const _editProfile = () => {
    Alert.alert(
      'Edit Profile',
      'Confirm to edit profile',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => editOke()},
      ],
      {cancelable: false},
    );
  };

  const editOke = () => {
    if (image !== null && name !== '') {
      let fd = new FormData();
      fd.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
      dispatch(register(fd))
        .then(res => {
          // console.warn(res.value.data.result.image);
          firebase
            .database()
            .ref('users/' + token)
            .update({
              avatar: res.value.data.result.image,
              name: name.trim(),
            })
            .then(() => {
              ToastAndroid.show('Edit profile sucess', ToastAndroid.SHORT);
            });
        })
        .catch(err => {
          ToastAndroid.show("Opps can't edit profile!", ToastAndroid.SHORT);
        });
    } else {
      firebase
        .database()
        .ref('users/' + token)
        .update({
          name: name.trim(),
        })
        .then(() => {
          ToastAndroid.show('Edit profile name sucess', ToastAndroid.SHORT);
        });
    }
  };

  const showModal = () => {
    getProfile();
    setImage(null);
    setModal(true);
  };

  return (
    <View style={styles.containerHeader}>
      <Icon
        name="comments"
        solid
        color="#fff"
        size={25}
        style={styles.iconSend}
      />
      <Text style={styles.title}>Hayuu</Text>
      <TouchableOpacity onPress={() => showModal()}>
        <Icon
          name="user"
          solid
          color="#fff"
          size={25}
          style={styles.iconSend}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={false}
        visible={modal}
        style={styles.modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <>
          <View style={styles.containerHeader}>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.boxProfile}>
              <Image
                source={image === null ? {uri: avatar} : {uri: image.uri}}
                style={styles.imgProfile}
              />
              <TouchableOpacity onPress={showImage} style={styles.edit}>
                <Icon name="edit" solid color="green" size={25} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerInput}>
              <TextInput
                placeholder="Profile Name...."
                style={styles.textInput}
                onChangeText={e => setName(e)}
                value={name}
              />
              <Text style={styles.username}>{data.key}</Text>
              <Text style={styles.username}>{email}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: 'green'}]}
                onPress={() => _editProfile()}>
                <Text style={styles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={_logout}>
                <Text style={styles.btnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </Modal>
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
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 1,
    fontSize: 20,
    marginTop: 20,
  },
  containerInput: {
    paddingHorizontal: 30,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 30,
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
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
  username: {
    marginTop: 10,
    color: 'green',
  },
});
export default Header;
