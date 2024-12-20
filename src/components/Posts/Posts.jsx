import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import style from './Posts.module.scss';

import { likePostThunk, disLikePostThunk } from '../../redux/actions/postsActions';

import avatar from './img/avatar.png';

function Posts({ post, isSignUp, likePost, disLikePost, token }) {
  const { title, description, favoritesCount, author, tagList, createdAt, slug, favorited } = post;

  let toogleLike;
  favorited ? (toogleLike = disLikePost) : (toogleLike = likePost);

  const buttonLiked = isSignUp && favorited ? style['App_main_content_button-liked'] : style.App_main_content_button;

  return (
    <div className={style.App_main_content}>
      <div className={style.App_main_content_header}>
        <div className={style["App_main_content_header-title"]}>
          <div className={style["App_main_content_title-wrapper"]}>
            <Link to={`/articles/${slug}`}>{title}</Link>
            <button
              className={buttonLiked}
              disabled={!isSignUp}
              type="button"
              label="Like"
              onClick={() => toogleLike(slug, token)}
            />
            <span className={style["App_main_content_like-counter"]}>{favoritesCount}</span>
          </div>
          <div className={style.App_main_content_tag}>
            {tagList.map((tag) => (
              <li key={uuidv4()} className={style.App_main_content_item}>
                {tag}
              </li>
            ))}
          </div>
        </div>
        <div className={style["App_main_content_header-user"]}>
          <div className={style["App_main_content_user-block"]}>
            <div className={style["App_main_content_user-block_dataName"]}>
              <span className={style["App_main_content_user-name"]}>{author.username}</span>
              <span className={style.App_main_content_data}>{format(new Date(createdAt), 'MMMM dd, yyyy ')}</span>
            </div>
            <img src={author.image || avatar} alt="avatar" className={style.App_main_content_image} />
          </div>
        </div>
      </div>
      <div className={style.App_main_content_text}>{description}</div>
    </div>
  );
}

const mapStateToProps = ({ users, posts }) => ({
  ...users,
  ...posts,
});

const mapDispatchToProps = {
  likePost: likePostThunk,
  disLikePost: disLikePostThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

Posts.defaultProps = {
  token: '',
};

Posts.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  isSignUp: PropTypes.bool.isRequired,
  token: PropTypes.string,
  likePost: PropTypes.func.isRequired,
  disLikePost: PropTypes.func.isRequired,
};