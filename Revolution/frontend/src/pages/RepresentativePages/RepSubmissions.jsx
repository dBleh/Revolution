import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import PolicyForm from '../../components/PolicyForm';
import { addPdf, addPolicy, addCompanyInformation, addContactInfo, reset } from '../../features/Auth/authSlice'
import PdfForm from '../../components/PdfForm';
import CompanyInformationForm from '../../components/CompanyInformationForm';
import ContactForm from '../../components/ContactForm';

function RepSubmissions() {
  const { client, user } = useSelector((state) => state.auth);
  const [formType, setFormType] = useState('policyForm'); 
  const { Option } = Select;
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    if (formType === 'pdfForm') {
      e.append('clientId', client._id);
      e.append('repId', user._id);
    
      dispatch(addPdf(e))
      dispatch(reset())
    }
    if(formType === 'policyForm'){
      e.clientId = client._id
      e.repId = user._id
      dispatch(addPolicy(e))
    }
    if(formType === 'companyInformationForm'){
      e.clientId = client._id
      e.repId = user._id
      dispatch(addCompanyInformation(e))
    }
    if(formType === 'contactForm'){
      e.clientId = client._id
      dispatch(addContactInfo(e))
    }
   
  };
  const handleFormTypeChange = (value) => {
    setFormType(value);
  };
  return (
    <div>
      {client ?<>
      <Select value={formType} onChange={handleFormTypeChange}>
          <Option value="policyForm">Policy Form</Option>
          <Option value="pdfForm">PDF Form</Option>
          <Option value="companyInformationForm"> Company Information Form </Option>
          <Option value="contactForm"> Contact Form </Option>
          <Option value="test"> Test</Option>
        </Select>
        {formType === 'policyForm' ? <PolicyForm onSubmit={onSubmit}  /> : null}
        {formType === 'pdfForm' ? <PdfForm onSubmit={onSubmit} /> : null}
        {formType === 'companyInformationForm' ? <CompanyInformationForm onSubmit={onSubmit} /> : null}
        {formType === 'contactForm' ? <ContactForm onSubmit={onSubmit} /> : null}  
        
      </>
      : 'No Client selected '}
      {/* Toggle switch to switch between form and PDF submission form */}
      
    </div>
  );
}

export default RepSubmissions;
