import React, { Component } from 'react';

export default class NoteError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {      
      return (
        <h2>There was a problem with retrieving the note or folder.</h2>
      );
    }
    return this.props.children;

  }
}