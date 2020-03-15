import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import WeeklyItem from './WeeklyItem';

class WeeklyList extends React.Component {
  constructor(props) {
    super(props);

    let topic;
    for (let key in this.props.data) {
      topic = key;
    }
    this.state = {
      topic: topic,
      data: this.props.data,
      list: this.props.data[topic],
    };
  }

  render() {
    return (
      <View key={this.state.topic} style={styles.weeklyWraper}>
        <Text style={styles.weeklyTopic}>{this.state.topic}</Text>
        {this.state.list.map((item, index) => {
          return <WeeklyItem key={index} {...item} {...this.props} />;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weeklyWraper: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginBottom: 18,
    paddingVertical: 10,
  },
  weeklyTopic: {
    height: 30,
    backgroundColor: '#649F0C',
    color: '#fff',
    lineHeight: 22,
    paddingLeft: 15,
    width: 150,
  },
});

export default WeeklyList;
