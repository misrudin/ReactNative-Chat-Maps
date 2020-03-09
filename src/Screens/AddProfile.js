import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {register} from '../Public/Redux/actions/user';

const AddProfile = ({route, navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

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

  const _register = async () => {
    const {email, password, address, gender} = route.params.data;
    let fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);
    fd.append('gender', gender);
    fd.append('address', address);
    fd.append('name', name);
    fd.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });
    await dispatch(register(fd)).then(dataUser => {
      console.warn(dataUser.value.data.result);
    });
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(route.params.data)}</Text>
      <View>
        <TouchableOpacity onPress={showImage}>
          <Image
            source={image ? {uri: image.uri} : null}
            style={styles.imgProfile}
          />
          <Text>Add Profile Photo</Text>
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
      <TouchableOpacity style={styles.btn} onPress={_register}>
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
});

export default AddProfile;
