import React from 'react';
import { Form, Input, Upload, Button } from 'antd';


const PdfForm = ({ onSubmit }) => { 
    const [form] = Form.useForm();
    

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append('filename', values.filename);
        formData.append('pdf', values.pdf[0].originFileObj);
        onSubmit(formData);
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item
                label="Filename"
                name="filename"
                rules={[{ required: true, message: 'Please enter a filename' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="PDF"
                name="pdf"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: 'Please select a PDF file' }]}
            >
                <Upload beforeUpload={() => {
                    return false;
                }}>
                    <Button>Select File</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PdfForm;
