import React from 'react';
import { Link } from 'react-router-dom';
//import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext.js';
import config from '../config.js';
import PropTypes from 'prop-types';
import './Note.css';


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    }) 
      .then(res => {
        if (!res.ok) { return res.json().then(e => Promise.reject(e)) }
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id } = this.props;


    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleClickDelete}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'> 
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  // id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string
}

//  Modified{' '}<span className='Date'>{format(modified, 'Do MMM YYYY')}</span>
