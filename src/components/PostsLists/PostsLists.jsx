import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Posts from '../Posts/Posts';
import style from './PostsLists.module.scss';
import { getPostsThunk, setCurrentPageAction, setPostAction } from '../redux/actions/postsActions';

const getSkipForPagination = (currentPage) => (currentPage - 1) * 5;

function PostsLists({ getPosts, posts, isLoading, currentPage, postsCount, setCurrentPage, setPost }) {
  useEffect(() => {
    getPosts(getSkipForPagination(currentPage)).then(() => setPost(null));
  }, [currentPage, getPosts, setPost]);

  const postsList = posts.map((post) => <Posts post={post} key={post.slug} />);

  return (
    <>
      {' '}
      {isLoading && <Spin size="large" className={style['ant-spin']} />}
      <div className={style.App_main}>
        <ul>{postsList}</ul>
        <Pagination
          pageSize={5}
          showSizeChanger={false}
          size="small"
          total={postsCount}
          defaultPageSize={5}
          current={currentPage}
          onChange={setCurrentPage}
          className={
            style[
              'ant-pagination'
            ]
          }
        />
      </div>
    </>
  );
}

const mapStateToProps = ({ posts, users }) => ({
  ...posts,
  ...users,
});

const mapDispatchToProps = {
  getPosts: getPostsThunk,
  setPost: setPostAction,
  setCurrentPage: setCurrentPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsLists);

PostsLists.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  postsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};