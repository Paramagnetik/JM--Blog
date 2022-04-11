import React, { useEffect, useState } from 'react';
import '../Posts/Posts.css';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Spin, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';

import { likePostThunk, disLikePostThunk, getPostThunk, deletePostThunk } from '../redux/actions/postsActions';
import avatar from '../Posts/img/avatar.png';

function PostPage({ getPost, openedPost, username, deletePost, token, isSignUp, likePost, dislikePost }) {
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPost(slug, token).then(() => setIsLoading(false));
  }, [getPost, slug, token]);

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

  const toggleLike = (favorited) => {
    favorited ? dislikePost(slug, token) : likePost(slug, token);
  };

<<<<<<< HEAD
  const buttonLiked = isSignUp && openedPost.favorited ? 'App_main_content_button-liked' : 'App_main_content_button';
=======
  let buttonLiked = isSignUp && openedPost.favorited ? 'App_main_content_button-liked' : 'App_main_content_button';
>>>>>>> 577f1dc8a22054d69a93b123fbb5092740e71611

  return (
    <div className="App_main">
      <div className="App_main_content">
        <div className="App_main_content_header">
          <div className="App_main_content_header-title">
            <div className="App_main_content_title-wrapper">
              <span>{title}</span>
              <button
                className={buttonLiked}
                disabled={!isSignUp}
                type="button"
                label="Like"
                onClick={() => toggleLike(openedPost.favorited)}
              />
              <span className="App_main_content_like-counter">{favoritesCount}</span>
            </div>
            <div className="App_main_content_tag">
              {tagList.map((tag) => (
                <li key={uuidv4()} className="App_main_content_item">
                  {tag}
                </li>
              ))}
            </div>
          </div>
          <div className="App_main_content_header-user">
            <div className="App_main_content_user-block">
              <div className="App_main_content_user-block_dataName">
                <span className="App_main_content_user-name">{author.username}</span>
                <span className="App_main_content_data">{format(new Date(createdAt), 'MMMM dd, yyyy ')}</span>
              </div>
              <img src={author.image || avatar} alt="avatar" className="App_main_content_image" />
            </div>
          </div>
        </div>
        <div className="App_main_content_text">
          <span>{description}</span>
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
        <div className="App_main_content_text-main">{body}</div>
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
  likePost: likePostThunk,
  dislikePost: disLikePostThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);


PostPage.defaultProps = {
  openedPost: {},
  username: '',
  token: '',
};

PostPage.propTypes = {
  openedPost: PropTypes.objectOf(PropTypes.arr),
  isSignUp: PropTypes.bool.isRequired,
  username: PropTypes.string,
  token: PropTypes.string,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  dislikePost: PropTypes.func.isRequired,
};