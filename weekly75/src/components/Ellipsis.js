import React, {Component} from 'react';

import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class Ellipsis extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity>
        <Text style={styles.text}>...</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 28,
    marginTop: -5,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default Ellipsis;
