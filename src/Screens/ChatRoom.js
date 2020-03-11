import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
// import AuthContext from '../Public/Context/auth';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import ItemChat from '../Components/ItemChat';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';

const ChatRoom = props => {
  const {loading, token} = useSelector(state => state.user);
  const scrollViewRef = useRef();
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState('');
  const [fName, setfName] = useState('');
  const [fuid, setfUid] = useState(props.route.params.uid);
  const [avatar, setAvatar] = useState('');
  const [uid, setUid] = useState(token);

  // const getToken = async () => {
  //   await AsyncStorage.getItem('Token', (err, token) => {
  //     setUid(token);
  //   });
  // };

  const sendMessage = () => {
    if (newChat.trim()) {
      let msgId = firebase
        .database()
        .ref('message')
        .child(uid)
        .child(fuid)
        .push().key;
      let updates = {};
      let message = {
        message: newChat,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: uid,
      };
      updates['messages/' + uid + '/' + fuid + '/' + msgId] = message;
      updates['messages/' + fuid + '/' + uid + '/' + msgId] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      setNewChat('');
    }
  };

  useEffect(() => {
    // getToken();
    const data = [];
    firebase
      .database()
      .ref('messages')
      .child(uid)
      .child(fuid)
      .on('child_added', value => {
        data.push(value.val());
        setChat(data);
      });
  }, []);

  const convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  const RenderRow = ({item}) => {
    return (
      <View style={item.from === uid ? styles.chatr : styles.chatl}>
        <Text style={styles.txtChat}>{item.message}</Text>
        <Text style={styles.time}>{convertTime(item.time)}</Text>
      </View>
    );
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <ScrollView
          style={styles.chatItem}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({animated: true});
          }}>
          {chat.map((c, i) => {
            return <RenderRow key={i} item={c} />;
          })}
        </ScrollView>
        <View style={styles.sendMessage}>
          <TextInput
            placeholder="Type..."
            style={styles.textInput}
            multiline
            onChangeText={e => setNewChat(e)}
            value={newChat}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.btn}>
            <Icon
              name="paper-plane"
              solid
              color="green"
              size={20}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 0,
    flex: 1,
    marginRight: 5,
    fontFamily: 'roboto',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingBottom: 20,
  },
  sendMessage: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width: 45,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  chatItem: {
    flex: 1,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  chatl: {
    backgroundColor: '#363636',
    maxWidth: '85%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderColor: '#f7f8fc',
    borderWidth: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chatr: {
    backgroundColor: '#00897b',
    maxWidth: '85%',
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderColor: '#f7f8fc',
    borderWidth: 2,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 20,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  time: {color: '#eee', padding: 3, fontSize: 12, alignSelf: 'flex-end'},
  txtChat: {
    color: '#fff',
    padding: 7,
    fontSize: 16,
    maxWidth: '90%',
  },
});

export default ChatRoom;
