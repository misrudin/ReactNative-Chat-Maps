import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Components/Header';

const Friend = ({navigation}) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Header />
      <View style={styles.container}>
        <View>
          <TextInput placeholder="Ex : haeu chat" style={styles.textInput} />
        </View>
        <View style={styles.friend}>
          <View style={styles.itemFriend}>
            <Image style={styles.avatar} />
            <Text>Friend</Text>
          </View>
          <View style={styles.itemFriend}>
            <Image style={styles.avatar} />
            <Text>Friend</Text>
          </View>
          <View style={styles.itemFriend}>
            <Image style={styles.avatar} />
            <Text>Friend</Text>
          </View>
          <View style={styles.itemFriend}>
            <Image style={styles.avatar} />
            <Text>Friend</Text>
          </View>
          <View style={styles.itemFriend}>
            <Image style={styles.avatar} />
            <Text>Friend</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.chatkuy}
        onPress={() => navigation.navigate('Maps')}>
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
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default Friend;
