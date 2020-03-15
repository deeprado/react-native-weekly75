import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Switch,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {Header, Icon} from 'react-native-elements';

import {UseReadability} from '../config';

const logoPng = require('../assets/images/logo.png');

class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useReadability: true,
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this._loadSettings();
  }

  async _loadSettings() {
    try {
      let value = await AsyncStorage.getItem(UseReadability);
      if (value !== null) {
        this.setState({useReadability: value === 'true'});
      }
    } catch (e) {
      Alert.alert(e);
    }
  }

  async _saveSettings({useReadability}) {
    try {
      await AsyncStorage.setItem(UseReadability, useReadability);
    } catch (e) {
      Alert.alert('保存失败');
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>设置</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fafafa',
        }}>
        <Header
          statusBarProps={{
            backgroundColor: '#333333',
            barStyle: 'light-content',
          }}
          backgroundColor={'#333333'}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logoPng} />
          <Text style={styles.version}>
            奇舞周刊 v{DeviceInfo.getVersion()}
          </Text>
        </View>

        <View style={styles.item}>
          <View>
            <Text style={styles.itemTitle}>网页转码</Text>
            <Text style={styles.itemDesc}>节约流量</Text>
          </View>
          <View>
            <Switch
              value={this.state.useReadability}
              onValueChange={value => {
                this.setState({
                  useReadability: value,
                });
                this._saveSettings({useReadability: `${!!value}`});
              }}
            />
          </View>
        </View>

        <Text style={styles.bottomText}>Talk is cheap, Show me the code.</Text>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    marginTop: 25,
  },
  version: {
    marginTop: 12,
    fontSize: 12,
    color: '#333',
  },
  item: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    padding: 15,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDesc: {
    marginTop: 9,
    fontSize: 14,
    color: '#909094',
  },
  bottomText: {
    color: '#999',
    fontSize: 12,
    marginTop: 17,
    textAlign: 'center',
  },
});
export default SettingPage;
