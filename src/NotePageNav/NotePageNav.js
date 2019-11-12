import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton.js';
import ApiContext from '../ApiContext.js';
import { findNote, findFolder } from '../notes-helpers.js';
import PropTypes from 'prop-types';
import './NotePageNav.css';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folder_id);

    return (
      <div className='NotePageNav'>
        <CircleButton tag='button' role='link' className='NotePageNav__back-button'
          onClick={() => this.props.history.goBack()} >
          <FontAwesomeIcon icon='chevron-left' />
          <br />Back
        </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.folder_name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.propTypes = {
	notes: PropTypes.array,
  folders: PropTypes.array,
  noteId: PropTypes.string,
	}