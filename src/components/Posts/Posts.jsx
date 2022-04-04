import React from 'react';
import './Posts.css';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import avatar from './img/avatar.png';
import like from './img/Vector.svg';

function Posts({ post }) {
  const { title, description, favoritesCount, author, tagList, createdAt, slug } = post;

  return (
    <div className="App_main_content">
      <div className="App_main_content_info">
        <div className="App_main_content_info-title">
          <Link to={`/articles/${slug}`}>{title}</Link>
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
  );
}

const mapStateToProps = ({ users, posts }) => ({
  ...users,
  ...posts,
});

export default connect(mapStateToProps)(Posts);
