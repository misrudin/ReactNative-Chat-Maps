import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';

const ChatList = props => {
  const handlePres = () => {
    props.onPress(props.data);
  };
  const handleLongPress = () => {
    Alert.alert('long press');
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handlePres(props.data)}
        onLongPress={() => handleLongPress()}>
        <View style={styles.content}>
          <View>
            <Image style={styles.avatar} source={{uri: props.data.avatar}} />
          </View>
          <View style={styles.chat}>
            <View>
              <Text style={styles.name}>{props.data.name}</Text>
            </View>
            <View>
              <Text style={styles.note}>{props.data.log}</Text>
            </View>
          </View>
        </View>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 17,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingVertical: 5,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#eee',
  },
  lineContainer: {
    alignItems: 'flex-end',
  },
  chat: {
    paddingVertical: 8,
    marginLeft: 10,
  },
  note: {
    color: '#acacac',
    marginTop: 4,
  },
});

export default ChatList;
