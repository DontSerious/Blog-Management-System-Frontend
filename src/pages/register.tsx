import { useState, FC, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/userAPI';

const Register: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        navigate('/login'); // 一秒后跳转到登录页面
      }, 1500);
    }
  }, [registrationSuccess, navigate]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await register(values);
      console.log('Registered values:', response.data);
      setLoading(false);
      setRegistrationSuccess(true);
    } catch (error) {
      // 处理注册失败
      setLoading(false);
      console.error('Registration failed:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 300 }}>
        <Form
          form={form}
          name="register-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '10px' }}
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '10px' }}>
            Already have an account?&nbsp;&nbsp;
            <Link to='/login'>
              Log in
            </Link>
          </Form.Item>

          {registrationSuccess ? (
            <p style={{ color: 'green' }}>Registration successful. Redirecting to login...</p>
          ) : null}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
