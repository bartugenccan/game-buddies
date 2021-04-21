import React, { Component } from 'react';
import {
  PacmanIndicator
} from 'react-native-indicators';

class Spinner extends Component {
  render() {
    return (
      <PacmanIndicator color='white' size = {70} />
    );
  }
}

export default Spinner;
