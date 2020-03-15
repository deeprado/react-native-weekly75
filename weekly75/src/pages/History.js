import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import AddBtn from '../components/AddBtn';
import Loading from '../components/Loading';
import Api from '../network/api';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loaded: false,
      count: 0,
      totalPage: 0,
      numsPerPage: 10,
      currentPage: 1,
      loadMore: false,
      allLoaded: false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  async _fetchData() {
    let {dataSource, allLoaded} = this.state;
    if (allLoaded) {
      return;
    }
    let response = await Api.getList(this.state.currentPage);
    let responseData = response.data;

    this.setState({
      dataSource: dataSource.concat(responseData.list),
      loaded: true,
      count: responseData.count,
      totalPage: responseData.totalPage,
      numsPerPage: responseData.numsPerPage,
      currentPage: responseData.currentPage,
      isRefreshing: false,
    });

    if (this.state.totalPage === this.state.currentPage) {
      this.state.allLoaded = true;
    }
  }

  _jumpPage(item) {
    this.props.navigation.navigate('Latest', {
      iid: item.iid,
    });
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            this._jumpPage(item);
          }}>
          <Text>奇舞周刊第{item.iid}期</Text>
          <Text style={styles.date}>{item.date}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    this._fetchData();
  }

  _renderFooter() {
    let {loadMore, allLoaded} = this.state;
    if (allLoaded) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.footer}
        onPress={this._getMore.bind(this)}>
        <Text style={{color: '#ccc'}}>
          {loadMore ? '加载中....' : '加载更多'}
        </Text>
      </TouchableOpacity>
    );
  }

  _getMore() {
    let currentPage = this.state.currentPage + 1;
    this.setState({
      loadMore: true,
      currentPage,
    });
    this._fetchData().then(() => {
      this.setState({
        loadMore: false,
      });
    });
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>往期</Text>
      </View>
    );
  }

  render() {
    let {loaded, dataSource} = this.state;
    if (!loaded) {
      return <Loading />;
    }
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
          style={styles.datacontainer}
          data={dataSource}
          onEndReachedThreshold={1}
          onEndReached={this._getMore.bind(this)}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this._renderFooter.bind(this)}
          ItemSeparatorComponent={() => <View style={styles.separatorbBox} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#649F0C"
              title="用力啊..."
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
    flex: 1,
  },
  datacontainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingVertical: 15,
  },
  separatorbBox: {
    height: 1,
    backgroundColor: '#F5F5F5',
  },
  date: {
    color: '#999',
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default History;
