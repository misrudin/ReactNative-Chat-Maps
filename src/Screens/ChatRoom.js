import React, {
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import app from '../Config/Firebase';
import 'firebase/firestore';
// import AuthContext from '../Public/Context/auth';
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ItemChat from '../Components/ItemChat';

const ChatRoom = props => {
  const scrollViewRef = useRef();
  const [chat, setChat] = useState([]);
  const [newChat, setNewChat] = useState([]);

  const sendMessage = () => {
    if (newChat) {
      const newData = [];
      newData.push(...chat, {
        no: 1,
        chat: newChat,
      });
      setChat(newData);
      setNewChat('');
    }
  };

  useEffect(() => {
    const data = [
      {
        no: 1,
        chat: 'halooo',
      },
      {
        no: 2,
        chat: 'Haiii',
      },
      {
        no: 1,
        chat: 'halooo',
      },
      {
        no: 1,
        chat: 'halooo',
      },
    ];
    setChat(data);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.chatItem}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({animated: true});
          }}>
          {chat.map((c, i) => {
            return <ItemChat key={i} data={c} />;
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
    width: 40,
    height: 40,
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
});

export default ChatRoom;
