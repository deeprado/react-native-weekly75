import React from 'react';

import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native';

const mark2Png = require('../../assets/images/mark2.png');
const forwardPng = require('../../assets/images/forward.png');
const settingPng = require('../../assets/images/setting.png');

class SettingList extends React.Component {
  constructor(props) {
    super(props);
  }

  _jumpMark() {
    this.props.navigation.navigate('MarkPage');
  }

  _jumpSetting() {
    this.props.navigation.navigate('Setting');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="#fafafa"
          onPress={() => {
            this._jumpMark();
          }}>
          <View style={styles.item}>
            <View style={styles.itemName}>
              <Image style={styles.icon} source={mark2Png} />
              <Text>我的收藏</Text>
            </View>
            <Image style={styles.forward} source={forwardPng} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          underlayColor="#fafafa"
          onPress={() => {
            this._jumpSetting();
          }}>
          <View style={[styles.item, {borderBottomWidth: 0}]}>
            <View style={styles.itemName}>
              <Image style={styles.icon} source={settingPng} />
              <Text>设置</Text>
            </View>
            <Image style={styles.forward} source={forwardPng} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    marginTop: 18,
  },
  item: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingRight: 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
});

export default SettingList;
