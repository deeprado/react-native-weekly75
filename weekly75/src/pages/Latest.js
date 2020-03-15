'use strict';

import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Api from '../network/api';

import WeeklyList from './latest/WeeklyList';
import Loading from '../components/Loading';
import AddBtn from '../components/AddBtn';

class Latest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      loaded: false,
      dataSource: [],
      showDetail: this.props.iid ? true : false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    if (this.props.iid) {
      this._fetchData(this.props.iid);
    } else {
      this._fetchData();
    }
  }

  async _fetchData(iid) {
    try {
      let response = iid ? await Api.getDetail(iid) : await Api.getNewest();
      let {
        data: {detail, list},
      } = response;
      this.setState({
        detail: detail,
        dataSource: list,
        loaded: true,
        isRefreshing: false,
      });
    } catch (e) {
      Alert.alert('错误');
    }
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>
          奇舞周刊
        </Text>
      </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this.state.showDetail ? this._fetchData(this.props.iid) : this._fetchData();
  }

  _renderItem = row => {
    let {item, index} = row;
    return (
      <WeeklyList key={index} data={item} navigation={this.props.navigation} />
    );
  };

  render() {
    let {loaded, detail, showDetail, dataSource} = this.state;
    if (!loaded) {
      return (
        <View>
          <StatusBar barStyle="light-content" />
          <Loading />
        </View>
      );
    }
    const currentNum = `当前第 ${detail.iid} 期，更新于 ${detail.date}`;
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
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            styles.weeklyContentWraper,
            showDetail ? {marginBottom: 0} : null,
          ]}
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponentr={() => {
            return <Text style={{position: 'absolute', top: 0}} />;
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#649F0C"
              title={currentNum}
              progressBackgroundColor="#649F0C"
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  topText: {
    color: '#666',
    textAlign: 'center',
    paddingBottom: 20,
    position: 'absolute',
    top: -30,
    width: Dimensions.get('window').width,
  },
  weeklyContentWraper: {
    marginTop: -1,
  },
});

export default Latest;
