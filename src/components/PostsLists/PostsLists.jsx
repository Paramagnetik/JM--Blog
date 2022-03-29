import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { connect } from 'react-redux';

import Posts from '../Posts/Posts.jsx';
import './PostsLists.css';
import { getPostsThunk, setCurrentPageAction, setPostAction } from '../redux/actions/postsActions.js';

const getSkipForPagination = (currentPage) => (currentPage - 1) * 5;

function PostsLists({ getPosts, posts, isLoading, currentPage, postsCount, setCurrentPage, setPost }) {
  useEffect(() => {
    getPosts(getSkipForPagination(currentPage)).then(() => setPost(null));
  }, [currentPage, getPosts, setPost]);

  const postsList = posts.map((post) => <Posts post={post} key={post.slug} />);

  return (
    <div className="App_main">
      {isLoading && <Spin size="large" />}
      <ul>{postsList}</ul>
      <Pagination
        pageSize={5}
        showSizeChanger={false}
        size="small"
        total={postsCount}
        defaultPageSize={5}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}

const mapStateToProps = ({ posts, user }) => ({
  ...posts,
  ...user,
});

const mapDispatchToProps = {
  getPosts: getPostsThunk,
  setPost: setPostAction,
  setCurrentPage: setCurrentPageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsLists);
