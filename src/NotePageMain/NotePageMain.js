import React from 'react';
import Note from '../Note/Note.js';
import ApiContext from '../ApiContext.js';
import { findNote } from '../notes-helpers.js';
import './NotePageMain.css';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context;
    const { noteId } = this.props.match.params;
    const {note_title, note_content, modified } = findNote(notes, parseInt(noteId));
   
    return (
      <section className='NotePageMain'>
        <Note id={noteId} name={note_title} modified={modified} onDeleteNote={this.handleDeleteNote}/>
        <div className='NotePageMain__content'>
          {note_content.split(/\n \r|\n/).map((parag, i) =>
            <p key={i}>{parag}</p>
          )}
        </div>
      </section>
    )
  }
}