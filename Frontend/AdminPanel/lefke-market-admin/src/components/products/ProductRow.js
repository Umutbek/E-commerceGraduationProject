import React, {useCallback, useContext, useEffect, useState} from 'react'
import NoPhoto from "../../assets/images/no-photo.jpg"
import {CButton, CFormGroup, CInput} from "@coreui/react"
import EditIcon from "../../assets/icons/free-icon-edit.svg"
import DeleteIcon from "../../assets/icons/free-icon-delete.svg"
import {Link} from "react-router-dom";
import ServerServiceContext from "../../contexts/ServerServiceContext"
import MiniSpinner from "../spinners/MiniSpinner";

function ProductRow({ product, number, onDelete, fetchProducts }) {

  const serverService = useContext(ServerServiceContext)

  const [cost, setCost] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(true)

  useEffect(() => { setCost(product.cost) }, [product])

  useEffect(() => {
    if (product.cost.toString() === cost.toString()){
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }, [cost])

  const updateCost = useCallback(async () => {
    setIsLoading(true)
    const result = await serverService.updateProduct(product.id, {cost: cost.toString().length ? cost : null})
    if (!result.hasError){
      setSuccess(true)
    } else {
      setSuccess(false)
    }

    fetchProducts()
    setIsLoading(false)
  }, [cost, product])

  const keyPressHandler = e => {
    if (e.code === 'Enter'){
      updateCost().then(() => {})
    }
  }

  return (
    <tr key={product.id}>
      <th scope="row" style={{ width: '5%' }}>{ number }</th>
      <td style={{ width: '53%' }}>{ product.name }</td>
      <td style={{ width: '8%', padding: 0 }}>
        <div style={{ width: 50 }}>
          <img
            src={product.image || NoPhoto}
            alt=""
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </td>
      <td style={{ width: '15%'}}>
        <div className="d-flex justify-content-between pr-3">
          <CInput
            type="number"
            value={cost}
            style={{ width: 80, padding: 5 }}
            onChange={e => setCost(e.target.value)}
            onKeyPress={keyPressHandler}
          />
          {
            isLoading ? <div className="pr-2 pt-1">
                <MiniSpinner/>
              </div> :
              success ?
                <div className="pr-2 pt-1">
                  <svg width={20} version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                    <circle fill="#4CAF50" cx="24" cy="24" r="21"/>
                    <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"/>
                  </svg>
                </div> :
                <CButton color="primary" onClick={updateCost}>
                  OK
                </CButton>
          }
        </div>
      </td>
      <td style={{ width: '12$' }}>
        <div className="d-flex justify-content-around">
          <Link to={`/products/edit/${product.id}`} style={{width: "20px"}}>
            <img src={EditIcon} alt="" width="100%" height="100%"/>
          </Link>
          <a onClick={e => { e.preventDefault(); onDelete(product) }} style={{width: "20px", cursor: 'pointer'}}>
            <img src={DeleteIcon} alt="" width="100%" height="100%"/>
          </a>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow
