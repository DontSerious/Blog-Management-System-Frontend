import { useState, FC, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/userAPI'
import { useAuth } from '../contexts/AuthContext';
import { StatusSuccess } from '../constants';

const Login: FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { statusMsg, setAuthData } = useAuth();
  const [loginFail, setLoginFail] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate('/home') // 跳转到登录页面
      }, 1500)
    }
  }, [loginSuccess, navigate])

  const onFinish = async (values: any) => {
    setLoading(true)
    setLoginSuccess(false);
    setLoginFail(false);
    try {
      const response = await login(values);
      const data = response.data;
      setAuthData(data.status_code, data.status_msg);
      if (data.status_code === StatusSuccess) {
        setLoginSuccess(true);
      } else {
        setLoginFail(true);
      }
    } catch (error) {
      // 处理登录失败
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 300 }}>
        <Form
          form={form}
          name="login-form"
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
            rules={[{ required: true, message: '输入有误!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '10px' }}>
              还没有账号？&nbsp;&nbsp;
              <Link to='/register'>
                注册
              </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>

          <div>
            {loginSuccess ? (
              <p style={{ color: 'green' }}> {statusMsg} 正在跳转... </p>
            ) : null}
            {loginFail ? (
              <p style={{ color: 'red' }}> {statusMsg} 请重试...</p>
            ) : null}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
