import React from 'react';
import './SignUp.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUpThunk } from '../redux/actions/usersActions';

function SignUp({ signUp }) {
  const onSubmit = (value) => {
    // console.log(value);
    signUp(value);
  };

  return (
    <div className="App_main">
      <Form autoComplete="off" className="Modal_form" onFinish={onSubmit}>
        <h2>Create new account</h2>
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please enter your Username',
            },
            {
              whitespace: true,
            },
            { min: 3, max: 20 },
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email addres"
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Email addres" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your password',
            },
            { min: 6, message: 'Your password needs to be at least 6 characters' },
            { max: 40 },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Repeat Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords must match');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('To proceed, you need to agree with our terms and conditions'),
            },
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
        <span className="Form_footer">
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </span>
      </Form>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  ...users,
});

const mapDispatchToProps = {
  signUp: signUpThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
