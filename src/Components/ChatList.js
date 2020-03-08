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
    props.onPress();
  };
  const handleLongPress = () => {
    Alert.alert('long press');
  };
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePres}
        onLongPress={handleLongPress}>
        <View style={styles.content}>
          <View>
            <Image
              style={styles.avatar}
              source={require('../Assets/img/20200111_210245.jpg')}
            />
          </View>
          <View style={styles.chat}>
            <View>
              <Text style={styles.name}>{props.data}</Text>
            </View>
            <View>
              <Text style={styles.note}>Chat dari bakul cau ...</Text>
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
