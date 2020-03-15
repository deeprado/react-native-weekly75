import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{uri: 'http://tp2.sinaimg.cn/1779194137/180/40053276313/1'}}
        />
        <Text style={{marginTop: 18, color: '#999'}}>deeprado</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={{fontSize: 12, color: '#bbb'}}>编辑</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 150,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    marginTop: 20,
    borderRadius: 35,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  editBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});

export default UserInfo;
