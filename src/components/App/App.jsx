import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Headers from '../Headers/Headers.jsx';
import PostsLists from '../PostsLists/PostsLists.jsx';
import PostPage from '../PostPage/PostPage.jsx';
import SignUp from '../SignUp/SignUp.jsx';
import SignIn from '../SignIn/SignIn.jsx';
import Profile from '../Profile/Profile.jsx';
import CreateArticle from '../CreateArticle/CreateArticle';

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
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<CreateArticle />} />
      </Routes>
    </div>
  );
}

export default App;
