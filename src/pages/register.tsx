import { useState, FC, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/userAPI';
import { useAuth } from '../contexts/AuthContext';
import { StatusSuccess } from '../constants';

const Register: FC = () => {
  const { statusMsg, setAuthData } = useAuth();
  const [registrationFail, setRegistrationFail] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        navigate('/login'); // 一秒后跳转到登录页面
      }, 1500);
    }
  }, [registrationSuccess, navigate]);

  const onFinish = async (values: any) => {
    setLoading(true);
    setRegistrationSuccess(false);
    setRegistrationFail(false);
    try {
      const response = await register(values);
      const data = response.data;
      setAuthData(data.status_code, data.status_msg);
      if (data.status_code === StatusSuccess) {
        setRegistrationSuccess(true);
      } else {
        setRegistrationFail(true);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
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
            rules={[{ required: true, message: '输入有误!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '10px' }}
            name="password"
            rules={[{ required: true, message: '输入有误' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '10px' }}>
            已经有账号了？&nbsp;&nbsp;
            <Link to='/login'>
              登录
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              注册
            </Button>
          </Form.Item>

          <div>
            {registrationSuccess ? (
              <p style={{ color: 'green' }}> {statusMsg} 正在跳转... </p>
            ) : null}
            {registrationFail ? (
              <p style={{ color: 'red' }}> {statusMsg} 请重试...</p>
            ) : null}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
