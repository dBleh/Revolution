import React from 'react';
import { Form, Input, Button, TimePicker } from 'antd';

const CalendarForm = ({ onSubmit }) => { 
    const [form] = Form.useForm();

    const handleSubmit = (data) => {       
        onSubmit(data);
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item
                label="Event Description"
                name="info"
                rules={[{ required: true, message: 'Please enter event title' }]}
            >
                <Input />
                
            </Form.Item>
            <Form.Item
                label="Event Start Time"
                name="startTime"
                
            >
                <TimePicker />
                
            </Form.Item>
            <Form.Item
                label="Event End Time"
                name="endTime"
            >
                <TimePicker />
                
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CalendarForm;
