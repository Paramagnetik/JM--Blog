import React from 'react';
import './CreateArticle.css';
import { useForm } from 'react-hook-form';

function CreateArticle() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="App_main">
      <form className="Modal_form Modal_form_article" onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new article</h2>
        <label className="Modal_form_label">
          <span className="Modal_form_label-text">Title</span>
          <input
            placeholder="Username"
            defaultValue="Title"
            // className={userClassErrors}
            {...register('username', {
              required: 'Please enter your username',
              minLength: {
                value: 3,
                message: 'at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'maximum 20 characters',
              },
            })}
          />
        </label>
        {errors?.username?.message && <p>{errors?.username?.message || 'Error'}</p>}
      </form>
    </div>
  );
}

export default CreateArticle;
