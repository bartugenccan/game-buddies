import React, {Component} from 'react';
import {PacmanIndicator} from 'react-native-indicators';

// Simple acitivity-indicator class with color and size props.
class Spinner extends Component {
  render() {
    return <PacmanIndicator color={this.props.color} size={this.props.size} />;
  }
}

export default Spinner;
