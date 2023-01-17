import React from 'react';
import { Form, Input, Button } from 'antd';


const ContactForm = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;

    const handleSubmit = (values) => {
        onSubmit(values)
    };

    return (
        <div className = 'pfb'>
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{ remember: true }}
            style={{ marginTop: 15, marginBottom: 10, marginLeft: 15}}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
        >
            <FormItem
                label="Legal Entity Name"
                name="legalEntityName"
                colon={false}
                rules={[{ required: true, message: 'Please enter a the name for the contact' }]}
                wrapperCol={{span: 10}}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Email"
                name="email"
                colon={false}
                rules={[{ required: true, message: 'Please enter a quote date' }]}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Phone Number"
                name="phoneNumber"
                colon={false}
                rules={[{ required: true, message: 'Please enter a valid until date' }]}
            >
                <Input />
            </FormItem>
            
            <FormItem>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </FormItem>
        </Form>
        </div>
    );
}




export default ContactForm;
