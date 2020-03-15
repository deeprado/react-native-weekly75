'use strict';

import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

class WeeklyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useReadability: false,
    };
  }

  _jumpPage() {
    this.props.navigation.navigate('Reader', {
      url: this.props.url,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topMenu}>
          {this.props.provider ? (
            <Text style={styles.recommend}>{this.props.provider}推荐</Text>
          ) : (
            <Text style={styles.recommend}>主编推荐</Text>
          )}
          <View style={styles.topBtns} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this._jumpPage();
          }}
          style={styles.titleWrapper}>
          <Text style={styles.title}>{this.props.title}</Text>

          <Text style={styles.description}>{this.props.description}</Text>
        </TouchableOpacity>
        <View style={styles.tagList}>
          {this.props.tags.map(tag => {
            return (
              <Text style={styles.tagText} key={tag}>
                {tag}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleWrapper: {
    marginTop: 10,
  },
  recommend: {
    fontSize: 10,
    color: '#ccc',
  },
  topMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBtns: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 10,
  },
  description: {
    color: '#666',
    marginTop: 10,
  },
  tagList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    marginTop: 10,
    color: '#999',
    marginRight: 10,
  },
});

export default WeeklyItem;
