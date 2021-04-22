import React, { Component } from 'react';
import {
  PacmanIndicator
} from 'react-native-indicators';

class Spinner extends Component {
  render() {
    return (
      <PacmanIndicator color={this.props.color} size = {this.props.size} />
    );
  }
}

export default Spinner;
