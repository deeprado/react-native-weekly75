import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

const addPng = require('../assets/images/add.png');

class AddBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('AddPage');
        }}>
        <Image
          source={addPng}
          // style={{
          //   width: 18,
          //   height: 18,
          // }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {marginRight: 10},
});

export default AddBtn;
