import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ItemChat = props => {
  return (
    <View>
      <Text style={styles.chatl}>{props.data.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatl: {
    backgroundColor: 'green',
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#f7f8fc',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  chatr: {
    backgroundColor: 'lightgreen',
    maxWidth: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#f7f8fc',
    borderWidth: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    color: '#fff',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
});

export default ItemChat;
