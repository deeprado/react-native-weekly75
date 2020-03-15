import React from 'react';

import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
// import SearchBar from 'react-native-search-bar';
import {Header, SearchBar} from 'react-native-elements';

import Api from '../network/api';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dataSource: [],
      loaded: false,
      count: null,
      totalPage: null,
      numsPerPage: null,
      currentPage: 1,
      loadMore: false,
      allLoaded: false,
      data: [],
      searched: false,
    };
    this._search = this._search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    // this.props.navComponent.setNavItems({
    //   rightItem: {
    //     component: <AddBtn navigator={this.props.navigator} />,
    //   },
    // });
  }

  async _fetchData() {
    let {dataSource, currentPage, keyword} = this.state;
    if (this.state.allLoaded) {
      return;
    }
    let response = await Api.getSearch(keyword, currentPage);
    let responseData = response.data;
    dataSource = [...dataSource, ...responseData.list];
    this.setState({
      dataSource,
      loaded: true,
      count: responseData.count,
      totalPage: responseData.totalPage,
      numsPerPage: responseData.numsPerPage,
      currentPage: responseData.currentPage,
    });

    if (this.state.totalPage === this.state.currentPage) {
      this.setState({
        allLoaded: true,
      });
    }
  }

  _search = keyword => {
    this.setState({
      keyword,
      data: [],
      dataSource: [],
      searched: true,
    });

    this._fetchData();
  };

  updateSearch = search => {
    this._search({search});
  };

  _renderSearchBar() {
    const {search} = this.state;
    return (
      <SearchBar
        placeholder="请输入..."
        onChangeText={this.updateSearch}
        containerStyle={{
          backgroundColor: '#C9C9CE',
          padding: 10,
        }}
        inputContainerStyle={{
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: '#fff',
          height: 36,
          alignItems: 'center',
        }}
        inputStyle={{
          height: 20,
          fontSize: 16,
          alignItems: 'center',
        }}
        value={search}
      />
    );
  }

  renderLeftComponent() {
    return null;
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>搜索</Text>
      </View>
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => {
            this._jumpPage(item);
          }}>
          <Text>{item.title}</Text>
          <Text style={styles.date}>奇舞周刊第{item.iid}期</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 15,
          paddingBottom: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>暂无内容</Text>
      </View>
    );
  };

  _renderHeader = () => {
    return (
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 15,
          paddingBottom: 15,
        }}>
        <Text>搜索结果</Text>
      </View>
    );
  };

  _renderFooter() {
    let {loadMore, allLoaded, searched} = this.state;
    if (allLoaded || !searched) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
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
        }}>
        <Text style={{color: '#ccc'}}>
          {loadMore ? '加载中...' : '加载更多'}
        </Text>
      </TouchableOpacity>
    );
  }

  _jumpPage(item) {
    this.props.navigation.navigate('WebPage', {
      url: item.url,
    });
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
        <View>
          {/* 搜索框 */}
          {this._renderSearchBar()}
        </View>
        <View style={styles.dataContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={list => (this.list = list)}
            data={this.state.dataSource}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this._renderEmpty.bind(this)}
            ListHeaderComponent={this._renderHeader.bind(this)}
            ListFooterComponent={this._renderFooter.bind(this)}
            ItemSeparatorComponent={() => <View style={styles.separatorbBox} />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataContainer: {
    marginBottom: 140,
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 10,
    marginHorizontal: 15,
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

export default Search;
