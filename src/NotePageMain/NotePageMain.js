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
    const note = findNote(notes, noteId) || { content: '' };

    return (
      <section className='NotePageMain'>
        <Note id={note.id} name={note.name} modified={note.modified} onDeleteNote={this.handleDeleteNote}/>
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((parag, i) =>
            <p key={i}>{parag}</p>
          )}
        </div>
      </section>
    )
  }
}