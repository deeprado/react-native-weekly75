import React from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {UseReadability} from '../config';

import WebPage from './reader/WebPage';
import Parsed from './reader/Parsed';

// import Blank from '../components/Blank';
// import Title from '../components/Title';

// 读取本地设置来改变显示的组件
class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useReadability: true,
    };
  }

  componentDidMount() {
    this._loadStorage();
  }

  async _loadStorage() {
    try {
      let useReadability = await AsyncStorage.getItem(UseReadability);
      if (useReadability) {
        this.setState({
          useReadability: useReadability === 'true',
        });
      }
    } catch (e) {}
  }

  _jumpSource() {
    this.setState({
      useReadability: false,
    });
  }

  render() {
    let {useReadability} = this.state;

    if (useReadability === true) {
      return (
        <View>
          <Parsed {...this.props} failure={this._jumpSource.bind(this)} />
          <TouchableHighlight
            onPress={this._jumpSource.bind(this)}
            style={styles.jumpButton}>
            <Text style={styles.jumpText}>查看原文</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      // return <WebPage {...this.props} />;
      return (
        <View>
          <Text>asdfs</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  jumpButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
  },
  jumpText: {
    textAlign: 'right',
    lineHeight: 22,
    color: '#0E60AE',
  },
});

export default Reader;
