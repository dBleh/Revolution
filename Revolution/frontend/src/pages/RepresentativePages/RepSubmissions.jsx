import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import PolicyForm from '../../components/PolicyForm';
import { addPdf, addPolicy } from '../../features/auth/authSlice';
import PdfForm from '../../components/PdfForm';

function RepSubmissions() {
  const { client, user } = useSelector((state) => state.auth);
  const [formType, setFormType] = useState('policyForm'); 
  const { Option } = Select;
 
  const dispatch = useDispatch();
 
  const onSubmit = (e) => {
    if (formType === 'pdfForm') {
      e.append('clientId', client._id);
      e.append('repId', user._id);

      dispatch(addPdf(e));
    }
    if(formType === 'policyForm'){
      e.clientId = client._id
      e.repId = user._id
      dispatch(addPolicy(e))
    }
  };
  const handleFormTypeChange = (value) => {
    setFormType(value);
  };

  return (
    <div>
      <p>{client ? client.name : 'No Client selected '}</p>
      {/* Toggle switch to switch between form and PDF submission form */}
      <div>
      <Select value={formType} onChange={handleFormTypeChange}>
          <Option value="policyForm">Policy Form</Option>
          <Option value="pdfForm">PDF Form</Option>
        </Select>
        {formType === 'policyForm' ? <PolicyForm onSubmit={onSubmit}  /> : null}
        {formType === 'pdfForm' ? <PdfForm onSubmit={onSubmit} /> : null}
      </div>
    </div>
  );
}

export default RepSubmissions;
