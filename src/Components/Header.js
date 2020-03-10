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

const Header = props => {
  const {loading, token} = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState(token);
  const [avatar, setAvatar] = useState(null);

  const _logout = () => {
    AsyncStorage.removeItem('Token');
  };

  useEffect(() => {
    // const getToken = async () => {
    //   await AsyncStorage.getItem('Token', (err, token) => {
    //     console.warn(token);
    //     setUid(token);
    //   });
    // };
    // getToken();

    setTimeout(() => {
      firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', val => {
          // this.setState({
          //   name: val.val().name,
          //   telp: val.val().telp,
          //   status: val.val().status,
          //   avatar: val.val().avatar,
          // });
          setAvatar(val.val().avatar);
          setName(val.val().name);
        });
    }, 10);
  }, []);

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
            <Text style={styles.title}>Haeu Chat</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.boxProfile}>
              <Image source={{uri: avatar}} style={styles.imgProfile} />
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
            </View>
            <TouchableOpacity style={styles.btn} onPress={_logout}>
              <Text style={styles.btnText}>Logout</Text>
            </TouchableOpacity>
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
export default Header;
