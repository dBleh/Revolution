import { pdfToExtract } from '../../features/Auth/authSlice';
import { useDispatch } from 'react-redux';
import PdfForm from '../../components/PdfForm';
function RepClientDetails(){
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        dispatch(pdfToExtract(e))

    }

    return (
        <div>
            <PdfForm  onSubmit={onSubmit}>
                CLICK ME
            </PdfForm >
        </div>
       
    )
}

export  default RepClientDetails