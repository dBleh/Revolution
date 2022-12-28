import React from 'react';
import { Form, Input, DatePicker, InputNumber, Button } from 'antd';


const PolicyForm = ({ onSubmit }) => {
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
                label="Primary Activity"
                name="primaryActivity"
                colon={false}
                rules={[{ required: true, message: 'Please enter a primary activity' }]}
                wrapperCol={{span: 10}}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Quote Date"
                name="quoteDate"
                colon={false}
                rules={[{ required: true, message: 'Please enter a quote date' }]}
            >
                <DatePicker />
            </FormItem>
            <FormItem
                label="Valid Until"
                name="validUntil"
                colon={false}
                rules={[{ required: true, message: 'Please enter a valid until date' }]}
            >
                <DatePicker />
            </FormItem>
            <FormItem
                label="Policy Period (m)"
                name="policyPeriod"
                colon={false}
                rules={[{ required: true, message: 'Please enter a policy period' }]}
            >
                <InputNumber />
            </FormItem>
            <FormItem
                label="Revenue"
                name="revenue"
                colon={false}
                rules={[{ required: true, message: 'Please enter a revenue amount' }]}
            >
                <InputNumber />
            </FormItem>
            <FormItem
                label="Employees"
                name="employees"
                colon={false}
                rules={[{ required: true, message: 'Please enter the number of employees' }]}
            >
                <InputNumber />
            </FormItem>
            <FormItem
                label="Capacity"
                name="capacity"
                colon={false}
                rules={[{ required: true, message: 'Please enter a capacity' }]}
            >
                <InputNumber />
            </FormItem>
            <FormItem
                label="Policy Cost"
                name="policyCost"
                colon={false}
                rules={[{ required: true, message: 'Please enter a policy cost' }]}
            >
                <InputNumber />
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




export default PolicyForm;
