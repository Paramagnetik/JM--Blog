import React from 'react';
import { Routes, Route } from 'react-router-dom';
import style from'./App.module.scss';
import styles from '../Headers/Headers.module.scss';

import Headers from '../Headers/Headers';
import PostsLists from '../PostsLists/PostsLists';
import PostPage from '../PostPage/PostPage';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import CreateArticle from '../CreateArticle/CreateArticle';

function App() {
  return (
    <div className={style.App}>
      <div className={styles.App_header}>
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
        <Route path="/articles/:slug/edit" element={<CreateArticle />} />
      </Routes>
    </div>
  );
}

export default App;
