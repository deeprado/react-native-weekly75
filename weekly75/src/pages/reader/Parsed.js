import React from 'react';
import {View, Text, StyleSheet, Alert, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

import {parseDoamin} from '../../utils';

import Template from './parsedHTMLBody';

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    let params = props.navigation.state.params;
    let url = props.url || params.url || 'https://www.baidu.com';
    let domain = parseDoamin(url) || 'baidu.com';
    let readabilityUrl =
      props.readabilityUrl ||
      params.readabilityUrl ||
      'https://www.baidu.com';

    this.state = {
      domain: domain,
      content: '转码中...',
      readabilityUrl: readabilityUrl,
      originUrl: null,
      url: url,
    };
  }

  componentDidMount() {
    this._fetchContent();
  }

  _fetchContent() {
    try {
      fetch(this.state.readabilityUrl)
        .then(response => response.json())
        .then(responseData => {
          if (responseData.errno === 0) {
            this.setState({
              content: responseData.data.content,
              originUrl: responseData.data.url,
            });
          } else {
            this.setState({
              content: '转码失败。',
            });
            this.props.failure();
          }
        })
        .done();
    } catch (e) {
      Alert.alert(e);
    }
  }

  render() {
    var showUrl = this.state.originUrl;
    if (!showUrl) {
      showUrl = this.state.url;
    }
    return (
      <View style={styles.loaded}>
        <Text style={styles.domain}>{`内容由 ${this.state.domain} 提供`}</Text>

        <WebView
          style={styles.webview}
          onError={() => {
            Alert.alert('无法打开页面');
          }}
          source={{
            html: Template(this.state.content, showUrl),
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  unLoaded: {
    backgroundColor: '#fff',
  },
  loaded: {
    backgroundColor: '#555',
  },
  domain: {
    paddingTop: 10,
    height: Dimensions.get('window').height - 64,
    textAlign: 'center',
    color: '#ccc',
  },
  webview: {
    position: 'absolute',
    top: -(Dimensions.get('window').height - 64),
    height: Dimensions.get('window').height - 64,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
});

export default ContentView;
