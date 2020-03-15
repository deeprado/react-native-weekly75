import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // ProgressViewIOS,
  Alert,
  Dimensions,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import {WebView} from 'react-native-webview';
import {parseDoamin} from '../../utils';

class WebPage extends React.Component {
  constructor(props) {
    super(props);

    let params = props.navigation.state.params;
    let url = props.url || params.url || 'https://www.baidu.com';
    let domain = parseDoamin(url) || 'baidu.com';
    let title = props.title || params.title || '百度';
    this.state = {
      url: url,
      domain: domain,
      pageLoaded: false,
      title: title,
    };
    this.goBack = this.goBack.bind(this);
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  render() {
    let {pageLoaded, domain, url} = this.state;
    return (
      <View
        style={[
          styles.container,
          pageLoaded ? styles.loaded : styles.unLoaded,
        ]}>
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

        {/* <Text style={styles.domain}>
          {pageLoaded ? `网页由 ${domain} 提供` : ''}
        </Text> */}
        <WebView
          // automaticallyAdjustContentInsets={false}
          // style={styles.webview}
          source={{uri: url}}
          // startInLoadingState={true}
          // injectedJavaScript='document.body.style.backgroundColor="#fff"'
          // javaScriptEnabled={true}
          // domStorageEnabled={true}
          // scalesPageToFit={true}
          // onError={() => {
          //   Alert.alert('无法打开页面');
          // }}
          // onNavigationStateChange={navState => {
          //   // if (typeof navState.navigationType == 'undefined') {
          //   //   this.setState({
          //   //     pageLoaded: true,
          //   //     title: navState.title,
          //   //     progress: 1,
          //   //   });
          //   // }
          // }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  unLoaded: {
    backgroundColor: '#fff',
  },
  loaded: {
    backgroundColor: '#555',
  },
  domain: {
    paddingTop: 10,
    // backgroundColor: '555',
    height: Dimensions.get('window').height - 64,
    textAlign: 'center',
    color: '#ccc',
  },
  webview: {
    // position: 'absolute',
    // top: -(Dimensions.get('window').height - 64),
    // height: Dimensions.get('window').height - 64,
    // width: Dimensions.get('window').width,
    // backgroundColor: 'transparent',
  },
  progress: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
});

export default WebPage;
