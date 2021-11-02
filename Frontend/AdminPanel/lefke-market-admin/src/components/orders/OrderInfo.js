import React from 'react'
import {CCol, CFormGroup, CInput, CLabel, CRow, CTextarea} from "@coreui/react"
import {toNormalDate} from "../../helpers/time"
import {statuses} from "../../constants/orders"
import FullContentSpinner from "../spinners/FullContentSpinner"
import MiniSpinner from "../spinners/MiniSpinner";

function OrderInfo({ selectedOrder, orderItems, isItemsLoading }) {

  console.log('selectedOrder: ', selectedOrder)
  console.log('orderItems: ', orderItems)

  return (
    <>
      <CRow>
        {/*first column*/}
        <CCol md={4} xs={12}>
          <CFormGroup>
            <CLabel>Phone number</CLabel>
            <CInput
              value={selectedOrder.phone}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Order Date</CLabel>
            <CInput
              value={toNormalDate(selectedOrder.date.seconds, 'Today', 'Yesterday')}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Client name</CLabel>
            <CInput
              value={selectedOrder.clientname}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
        </CCol>
        {/*second column*/}
        <CCol md={4} xs={12}>
          <CFormGroup>
            <CLabel>Order ID</CLabel>
            <CInput
              value={parseFloat(selectedOrder.id)}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Total sum</CLabel>
            <CInput
              value={parseFloat(selectedOrder.totalprice).toFixed(2)}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Order type</CLabel>
            <CInput
              value={selectedOrder.ordertype === 1 ? 'Delivery' : 'Pick up'}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>

          { ((selectedOrder.status === statuses.DECLINED) && selectedOrder.declineReason) &&
          <CFormGroup>
            <CLabel>Decline Reason</CLabel>
            <CTextarea
              value={selectedOrder.declinereason}
              rows={3}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
          }
        </CCol>
        {/*third column*/}
        <CCol md={4} xs={12}>
          <CFormGroup>
            <CLabel>Address</CLabel>
            <CInput
              value={selectedOrder.address}
              disabled
              className="bg-white text-black-80"
            />
          </CFormGroup>
        </CCol>
      </CRow>
      <h4 className="my-2">Items</h4>

      {
        isItemsLoading ? <MiniSpinner center/> :
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total sum</th>
            </tr>
            </thead>
            <tbody>
            { orderItems.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{ index + 1 }</th>
                <td>{ item.name }</td>
                <td>{ item.cost }</td>
                <td>{ item.count }</td>
                <td>{ item.total }</td>
              </tr>
            )) }
            </tbody>
          </table>
      }
    </>
  )
}

export default OrderInfo
