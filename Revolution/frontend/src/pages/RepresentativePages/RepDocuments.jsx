import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPdfs } from '../../features/Auth/authSlice'

function RepDocuments() {
  const { user, pdfs, client  } = useSelector((state) => state.auth)
 
  const [selectedPdf, setSelectedPdf] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if(client && user){
      let ids = [user._id, client._id]
    dispatch(getPdfs(ids))
    }
  }, [client, user, dispatch])
  if (pdfs?.length > 0 && !selectedPdf) {
    setSelectedPdf(pdfs[0])
  }
  const renderPdf = (pdf) => {
    setSelectedPdf(pdf)
  }
  return (
    <div >
      {client && pdfs.length > 0 ? ( 
        <>
      <div className="dBox">
        <ul>
          {pdfs.map((item) => (
            <li key={item._id} onClick={() => renderPdf(item)}>
              {item.fileName}
            </li>
          ))}
        </ul>
      </div>
      <div>
      {selectedPdf && (
        <iframe src={URL.createObjectURL(new Blob([new Uint8Array(selectedPdf['data']['data'])] , { type: 'application/pdf' }))}title = "a" />
      )}
      </div>
      </>
      ):(
        <> No Documents Available </>)}              
      </div>
  )
}

export default RepDocuments
