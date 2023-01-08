import React, { useState } from 'react';
import { Form, Input, InputNumber, Slider, Button} from 'antd';


const CompanyInformationForm = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const FormItem = Form.Item;
    const [value, setValue] = useState(0);

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
                label="Business Type"
                name="business_Type"
                colon={false}
                rules={[{ required: true, message: 'Please add the business type' }]}
                wrapperCol={{span: 10}}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Company Name"
                name="company_name"
                colon={false}
                rules={[{ required: true, message: 'Please add the company name' }]}
            >
                <Input />
            </FormItem>
            <FormItem
                label="SIC Code"
                name="sic_code"
                colon={false}
                rules={[{ required: true, message: 'Please add a SIC code'}]}
            >
                <InputNumber />
            </FormItem>
            <FormItem
                label="Anuual Revenue"
                name="annual_revenue"
               
                value={value}
                onChange={(value) => setValue(value)}
                colon={false}
                rules={[{ required: true, message: 'Please add annual revenue' }]}
            >
                <InputNumber 
               
                 />
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




export default CompanyInformationForm;
