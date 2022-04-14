import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import style from './CreateArticle.module.scss';
import classes from '../PostsLists/PostsLists.module.scss';
import styles from '../SignIn/SignIn.module.scss';

import RealworldBlogApi from '../../api/realworldBlogApi';

const { createPost, updatePost } = RealworldBlogApi;

function CreateArticle({ token, openedPost }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  let newTags = [{ value: '', id: uuidv4() }];
  const { slug } = useParams();
  const [isPosted, setIsPosted] = useState(false);
  const [tags, setTags] = useState(newTags || [{ value: '', id: uuidv4() }]);

  const onSubmitPost = (data) => {
    const tagsArr = [];
    tags.map((elem) => tagsArr.push(elem.value));
    createPost({ ...data, tagList: tagsArr }, token).then(() => setIsPosted(true));
  };

  const onSubmitEdit = (data) => {
    const tagsArr = [];
    tags.map((elem) => tagsArr.push(elem.value));
    updatePost({ ...data, tagList: tagsArr }, slug, token).then(() => setIsPosted(true));
  };

  let onSubmit;
  let post = openedPost;

  if (window.location.pathname === `/articles/${slug}/edit`) {
    onSubmit = onSubmitEdit;
  } else {
    onSubmit = onSubmitPost;
    post = null;
  }

  const { body, description, tagList, title } = post || {
    body: null,
    description: null,
    tagList: null,
    title: null,
  };

  if (tagList !== null) {
    tagList.map((el) => newTags.push({ value: el, id: uuidv4() }));
  } else {
    newTags = null;
  }

  const handleAddTag = () => {
    setTags([
      ...tags,
      {
        value: '',
        id: uuidv4(),
      },
    ]);
  };

  const handleText = (event, id) => {
    setTags(
      tags.map((tag) => {
        if (id === tag.id) {
          tag.value = event.target.value;
        }
        return tag;
      })
    );
  };

  const deletTag = (id) => {
    setTags(tags.filter((el) => el.id !== id));
  };

  const titleClassErrors = errors.title ? styles['Modal_form_input-errors'] : styles.Modal_form_input;

  const descriptionClassErrors = errors.description ? styles['Modal_form_input-errors'] : styles.Modal_form_input;

  const textClassErrors = errors.text ? styles['Modal_form_input-errors'] : styles.Modal_form_input;

  const tagsList = tags.map(({ value, id }) => (
    <div key={uuidv4()}>
      <input
        placeholder="Tag"
        type="text"
        id={id}
        className={style.Modal_form_input_tags}
        value={value}
        autoFocus={value.length >= 1}
        onChange={(event) => handleText(event, id)}
      />
      <button
        placeholder="Tag"
        type="button"
        disabled={tags.length <= 1}
        className={tags.length <= 1 ? style['Modal_form_button_tag-delete--disabled'] : style['Modal_form_button_tag-delete']}
        onClick={() => deletTag(id)}
      >
        Delete
      </button>
    </div>
  ));

  if (isPosted) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={classes.App_main}>
      <form className={style.Modal_form_article} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.Modal_form_title}>Create new article</h2>
        <label className={styles.Modal_form_label}>
          <span className={styles['Modal_form_label-text']}>Title</span>
          <input
            placeholder="Title"
            type="text"
            defaultValue={title}
            className={titleClassErrors}
            {...register('title', {
              required: 'Title is required',
            })}
          />
        </label>
        {errors?.title?.message && <p>{errors?.title?.message || 'Error'}</p>}

        <label className={styles.Modal_form_label}>
          <span className={styles['Modal_form_label-text']}>Short description</span>
          <input
            placeholder="Title"
            type="text"
            defaultValue={description}
            className={descriptionClassErrors}
            {...register('description', {
              required: 'Description is required',
            })}
          />
        </label>
        {errors?.description?.message && <p>{errors?.description?.message || 'Error'}</p>}

        <label className={styles.Modal_form_label}>
          <span className={styles['Modal_form_label-text']}>Text</span>
          <textarea
            placeholder="Text"
            cols="30"
            rows="7"
            name="text"
            defaultValue={body}
            className={textClassErrors}
            style={{ height: 'auto' }}
            {...register('body', {
              required: 'Text is required',
            })}
          />
        </label>
        {errors?.body?.message && <p>{errors?.body?.message || 'Error'}</p>}

        <label className={styles.Modal_form_label} htmlFor="Tag">
          <span className={styles['Modal_form_label-text']}>Tags</span>
          <div className={style.Modal_form_tags}>
            <div className={style.Modal_form_tags_container}>{tagsList}</div>
            <button
              placeholder="Tag"
              type="button"
              className={style['Modal_form_button_tag-add']}
              onClick={handleAddTag}
            >
              Add tag
            </button>
          </div>
        </label>

        <button type="submit" className={styles.Modal_form_button} style={{ width: '319px', height: '40px' }}>
          Send
        </button>
      </form>
    </div>
  );
}
const mapStateToProps = ({ posts, users }) => ({
  ...posts,
  ...users,
});

export default connect(mapStateToProps)(CreateArticle);

CreateArticle.defaultProps = {
  token: '',
  openedPost: {},
};

CreateArticle.propTypes = {
  token: PropTypes.string,
  openedPost: PropTypes.objectOf(PropTypes.shape),
};
