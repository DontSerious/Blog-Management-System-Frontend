import React, { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useManagePage } from '../../contexts/ManagePageStore';

const ShowInfoForm: React.FC = () => {
	const { selectedMenuItem, showInfo } = useManagePage();
	const [form] = Form.useForm();

	useEffect(() => {
		// Update form fields when showInfo changes
		const updatedValues = showInfo.map((item, index) => ({ key: index, value: item }));
		form.setFieldsValue({ userInfoList: updatedValues });
	}, [showInfo, form]);

	const onFinish = (values: any) => {
		console.log('Received values of form:', values);
	};

	return (
		<Form
			form={form}
			name="modify_userInfo"
			onFinish={onFinish}
			style={{ maxWidth: 300 }}
			autoComplete="off"
		>
			<Form.List name="userInfoList">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
								<Form.Item
									{...restField}
									name={[name, 'value']}
									rules={[{ required: true, message: '为空' }]}
								>
									<Input placeholder={selectedMenuItem!} />
								</Form.Item>
								<MinusCircleOutlined onClick={() => remove(name)} />
							</Space>
						))}
						<Form.Item>
							<Button
								type="dashed"
								onClick={() => {
									add();
								}}
								block
								icon={<PlusOutlined />}
							>
								添加
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					提交
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ShowInfoForm;
