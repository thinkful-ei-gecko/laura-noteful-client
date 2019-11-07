import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav.js';
import NotePageNav from '../NotePageNav/NotePageNav.js';
import NoteListMain from '../NoteListMain/NoteListMain.js';
import NotePageMain from '../NotePageMain/NotePageMain.js';
import AddFolder from '../AddFolder/AddFolder.js';
import AddNote from '../AddNote/AddNote.js';
import ApiContext from '../ApiContext.js';
import NoteError from './NoteError.js';

import './App.css';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        const baseUrl = "https://fierce-stream-94043.herokuapp.com/";

        Promise.all([
          fetch(`${baseUrl}/notes`),
          fetch(`${baseUrl}/folders`)
        ])
          .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok) { return notesRes.json().then(e => Promise.reject(e)) }
            if (!foldersRes.ok) { return foldersRes.json().then(e => Promise.reject(e)) }
    
            return Promise.all([
              notesRes.json(),
              foldersRes.json(),
            ])
          })
          .then(([notes, folders]) => {
            this.setState({ notes, folders })
          })
          .catch(error => {
            console.error({ error })
          })
    }

    handleAddFolder = folder => {
        this.setState({ folders: [ ...this.state.folders, folder ] })
    }
    
    handleAddNote = note => {
        this.setState({ notes: [ ...this.state.notes, note ] })
    }
    
    handleDeleteNote = noteId => {
        this.setState({  notes: this.state.notes.filter(note => note.id !== noteId) })
    }
    

    renderNavRoutes() {
        return (
          <>
            {['/', '/folder/:folderId'].map(path =>
              <Route exact key={path} path={path} component={NoteListNav} />
            )}
            <Route path='/note/:noteId' component={NotePageNav} />
            <Route path='/add-folder' component={NotePageNav} />
            <Route path='/add-note' component={NotePageNav} />
          </>
        )
      }

    renderMainRoutes() {
      return (
        <>
          {['/', '/folder/:folderId'].map(path =>
            <Route exact key={path} path={path} component={NoteListMain} />
          )}
          <Route path='/note/:noteId' component={NotePageMain} />
          <Route path='/add-folder' component={AddFolder} />
          <Route path='/add-note' component={AddNote} />
        </>
      )
    }
 
    render() {
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote,
        deleteNote: this.handleDeleteNote,
      }
      return (
        <ApiContext.Provider value={value}>
          <div className='App'>
            <nav className='App__nav'> {this.renderNavRoutes()} </nav>
            
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>
                {' '}
                <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>

            <main className='App__main'>
            <NoteError>
              {this.renderMainRoutes()}
            </NoteError>
            </main>
          </div>
        </ApiContext.Provider>
      )
    }
    }
export default App;
