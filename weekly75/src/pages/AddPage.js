import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Clipboard,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Icon} from 'react-native-elements';

import Api from '../network/api';
import {UserAddName} from '../config';

class AddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        url: '',
        description: '',
        tags: '',
        provider: '',
      },
      viewMarginTop: 0,
      urlFromClipboard: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this._getName();
    this._getClipboardData();
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async _getClipboardData() {
    try {
      let content = await Clipboard.getString();
      if (/http(|s)\:\/\//.test(content)) {
        this._setTitle(content);
      }
    } catch (e) {}
  }

  _setTitle(url) {
    try {
      Api.getTitle(url)
        .then(responseData => {
          this.setState(
            Object.assign({}, this.state, {
              form: {
                title: responseData.data.title,
                url: url,
              },
            }),
          );
        })
        .done();
    } catch (e) {}
  }

  _postData() {
    try {
      Api.postAdd(JSON.stringify(this.state.form)).then(response => {
        if (response.errno === 0) {
          Alert.alert('提交成功');
          this._cleanForm();
        } else {
          Alert.alert(response.errmsg);
        }
      });
    } catch (e) {
      Alert.alert('网络错误');
    }
  }

  async _getName() {
    try {
      let username = await AsyncStorage.getItem(UserAddName);
      if (username != null) {
        this.setState({
          form: Object.assign({}, this.state.form, {
            provider: username,
          }),
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async _saveName() {
    try {
      console.log(this.state.form.provider);
      await AsyncStorage.setItem(UserAddName, this.state.form.provider);
    } catch (e) {}
  }

  _checkForm() {
    let {title, url, description, tags, provider} = this;
    this.setState({
      form: {
        title: title._getText(),
        url: url._getText(),
        descrition: description._getText(),
        tags: tags._getText(),
        provider: provider._getText(),
      },
    });
    this._postData();
  }

  _cleanForm() {
    this.setState({
      form: {
        title: '',
        url: '',
        description: '',
        tags: '',
        provider: '',
      },
    });
  }

  _setTop(e) {
    this.setState({
      viewMarginTop: -200,
    });
  }

  _resetTop(e) {
    this.setState({
      viewMarginTop: 0,
    });
  }

  _textChanged(textName, text) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [textName]: text,
      }),
    });
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
          添加新闻
        </Text>
      </View>
    );
  }

  render() {
    let {title, url, description, tags, provider} = this.state.form;
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

        <ScrollView
          ref={scroll => (this.scroll = scroll)}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginTop: this.state.viewMarginTop,
          }}
          keyboardDismissMode={'on-drag'}>
          <View>
            <Text style={styles.label}>文章标题</Text>
            <TextInput
              style={styles.input}
              maxLength={100}
              ref={title => (this.title = title)}
              value={title}
              onChangeText={this._textChanged.bind(this, 'title')}
              placeholder="100字以内"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text keyboardType="url" style={styles.label}>
              文章 URL
            </Text>
            <TextInput
              style={styles.input}
              maxLength={256}
              ref={url => (this.url = url)}
              value={url}
              onChangeText={this._textChanged.bind(this, 'url')}
              placeholder="256字以内"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text multiline={true} style={styles.label}>
              推荐理由
            </Text>
            <TextInput
              style={styles.input}
              maxLength={512}
              ref={description => (this.description = description)}
              value={description}
              onChangeText={this._textChanged.bind(this, 'description')}
              placeholder="512字内，允许html"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>关键词</Text>
            <TextInput
              ref={tags => (this.tags = tags)}
              style={styles.input}
              value={tags}
              onFocus={this._setTop.bind(this)}
              onBlur={this._resetTop.bind(this)}
              onEndEditing={this._resetTop.bind(this)}
              onChangeText={this._textChanged.bind(this, 'tags')}
              placeholder="用英文逗号隔开"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={styles.label}>您的名字</Text>
            <TextInput
              style={styles.input}
              ref={provider => (this.provider = provider)}
              onFocus={this._setTop.bind(this)}
              // onBlur={this._resetTop.bind(this)}
              // onBlur={this._saveName.bind(this)}
              onEndEditing={this._resetTop.bind(this)}
              value={provider}
              onChangeText={this._textChanged.bind(this, 'provider')}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                this._checkForm();
              }}>
              <Text style={styles.submitText}>提交</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  input: {
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    paddingVertical: 10,
  },
  submit: {
    backgroundColor: '#0078E7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default AddPage;
