import React, {useState, useEffect} from 'react';
import firebase from '../Config/Firebase';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MyProfile = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    var user = firebase.auth().currentUser;
    if (user != null) {
      setUid(user.uid);
    }

    firebase
      .database()
      .ref('users')
      .child(user.uid)
      .on('value', val => {
        setAvatar(val.val().avatar);
        setName(val.val().name);
        setData(val.val());
      });
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
      <Text>{data.key}j</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Next..</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
});

export default MyProfile;
