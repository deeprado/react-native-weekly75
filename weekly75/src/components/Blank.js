import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

class Blank extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});

export default Blank;
