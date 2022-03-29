import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Headers from '../Headers/Headers.jsx';
import PostsLists from '../PostsLists/PostsLists.jsx';
import PostPage from '../PostPage/PostPage.jsx';

function App() {
  return (
    <div className="App">
      <div className="App_header">
        {' '}
        <Headers />{' '}
      </div>
      <Routes>
        <Route path="/" element={<PostsLists />} />
        <Route path="/articles/:slug" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
