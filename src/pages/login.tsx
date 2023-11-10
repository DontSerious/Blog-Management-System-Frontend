import { useState, FC, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/userAPI'

const Login: FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
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
    try {
      const response = await login(values);
      // 处理登录成功的响应
      // setLoginSuccess(true)
      console.log('Login successful:', response.data);
      // 这里可以根据需要进行跳转等操作
    } catch (error) {
      // 处理登录失败
      console.error('Login failed:', error);
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
              Have no Account?&nbsp;&nbsp;
              <Link to='/register'>
                Sign in
              </Link>
          </Form.Item>

          {/* 三目运算符，显示登陆成功信息 */}
          {loginSuccess ? (
            <p style={{ color: 'green' }}>Login successful. Redirecting to Home...</p>
          ) : null}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
