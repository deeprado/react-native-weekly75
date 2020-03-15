'use strict';

import React from 'react';

import {StyleSheet, ActivityIndicator} from 'react-native';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ActivityIndicator color="#666" style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {marginVertical: 30, marginBottom: 30},
});

export default Loading;
