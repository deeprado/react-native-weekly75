import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

import AddBtn from '../components/AddBtn';
import UserInfo from './mine/UserInfo';
import SettingList from './mine/SettingList';

class Mine extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeftComponent() {
    return null;
  }

  renderRightComponent() {
    return <AddBtn navigation={this.props.navigation} />;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>我的</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
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

        <UserInfo navigation={this.props.navigation} />
        <SettingList navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

export default Mine;
