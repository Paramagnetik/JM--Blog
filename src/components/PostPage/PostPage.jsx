import React, { useEffect, useState } from 'react';
import '../Posts/Posts.css';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getPostThunk } from '../redux/actions/postsActions.js';
import like from '../Posts/img/Vector.svg';
import avatar from '../Posts/img/avatar.png';

function PostPage({ getPost, openedPost }) {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  console.log(slug);
  console.log(openedPost);
  useEffect(() => {
    getPost(slug).then(() => setIsLoading(false));
  }, [getPost, slug]);

  if (isLoading) {
    return (
      <div className="App_main">
        <Spin size="large" />
      </div>
    );
  }

  const { title, favoritesCount, tagList, author, createdAt, description } = openedPost;

  return (
    <div className="App_main">
      {' '}
      <div className="App_main_content">
        <div className="App_main_content_info">
          <div className="App_main_content_info-title">
            <span>{title}</span>
            <div className="App_main_content_container-like">
              <img src={like} alt="Like" className="App_main_content_container-like-img" />
              <span className="App_main_content_container-like-counter">{favoritesCount}</span>
            </div>
          </div>

          <div className="App_main_content_tag">
            {tagList.map((tag) => (
              <li key={uuidv4()} className="App_main_content_item">
                {tag}
              </li>
            ))}
          </div>
          <div className="App_main_content_info-text">{description}</div>
        </div>

        <div className="App_main_content_user">
          <div className="App_main_content_user-block">
            <span className="App_main_content_user-name">{author.username}</span>
            <span className="App_main_content_data">{format(new Date(createdAt), 'MMMM dd, yyyy ')}</span>
          </div>
          <img src={author.image || avatar} alt="avatar" className="App_main_content_image" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ posts }) => ({
  ...posts,
});

const mapDispatchToProps = {
  getPost: getPostThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
