import React, { useEffect, useState } from 'react';
import '../Posts/Posts.css';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Spin, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';

import { getPostThunk, deletePostThunk } from '../redux/actions/postsActions.js';
import like from '../Posts/img/Vector.svg';
import avatar from '../Posts/img/avatar.png';

function PostPage({ getPost, openedPost, username, deletePost, token }) {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPost(slug, token).then(() => setIsLoading(false));
  }, [getPost, slug]);

  if (isLoading) {
    return (
      <div className="App_main">
        <Spin size="large" />
      </div>
    );
  }

  if (!openedPost) {
    return <Navigate replace to="/" />;
  }

  const { title, favoritesCount, tagList, author, createdAt, description, body } = openedPost;

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
          <div>{body}</div>
        </div>

        <div className="App_main_content_user">
          <div className="App_main_content_user-block">
            <div className="App_main_content_user-block_dataName">
              <span className="App_main_content_user-name">{author.username}</span>
              <span className="App_main_content_data">{format(new Date(createdAt), 'MMMM dd, yyyy ')}</span>
            </div>
            <img src={author.image || avatar} alt="avatar" className="App_main_content_image" />
          </div>
          {username === openedPost.author.username && (
            <div>
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={() => deletePost(slug, token)}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className="App_main_content_user_button-delete">
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${slug}/edit`} className="App_main_content_user_button-edit">
                Edit
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ posts, users }) => ({
  ...posts,
  ...users,
});

const mapDispatchToProps = {
  getPost: getPostThunk,
  deletePost: deletePostThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
