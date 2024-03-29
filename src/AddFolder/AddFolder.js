import React, { Component } from 'react';
import NotefulForm from '../NotefulForm/NotefulForm.js';
import ApiContext from '../ApiContext.js';
import config from '../config.js';

import './AddFolder.css';

export default class AddFolder extends Component {
  static defaultProps = {
    history: { push: () => { } },
  };
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault();
    const folder = { folder_name: e.target['folder-name'].value };

    fetch(`${config.API_BASE_URL}/folders`, {
      method: 'POST',
      headers: {'content-type': 'application/json' },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok) { return res.json().then(e => Promise.reject(e)) }
        return res.json()
      })
      .then(newFolder => {
        this.context.addFolder(newFolder)
        console.log(newFolder);
        this.props.history.push(`/folder/${newFolder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>Name </label>
            <input type='text' id='folder-name-input' name='folder-name' required/>
          </div>
          <div className='buttons'>
            <button type='submit'>Add folder</button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

