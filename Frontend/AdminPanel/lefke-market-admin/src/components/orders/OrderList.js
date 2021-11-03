import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  CDataTable,
  CBadge,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CTextarea
} from "@coreui/react"
import {useSelector} from "react-redux"
import FullContentSpinner from "../spinners/FullContentSpinner"
import {statuses} from "../../constants/orders"
import {toNormalDate} from "../../helpers/time"
import {useFirestore} from "react-redux-firebase"
import ServerServiceContext from "../../contexts/ServerServiceContext"
import WithBgSpinner from "../spinners/WithBgSpinner"
import OrderInfo from "./OrderInfo"
import {toast} from "react-toastify"

function OrdersList({ status = 'all' }) {

  const firestore = useFirestore()
  const userId = useSelector(state => state.auth.user.id)
  const serverService = useContext(ServerServiceContext)

  const {orders, isOrdersLoading} = useSelector(state => state.orders)
  const [isItemsLoading, setIsItemsLoading] = useState(false)

  const [orderItems, setOrderItems] = useState([])

  const [firestoreLoading, setFirestoreLoading] = useState(false)

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const openOrderModal = useCallback(async item => {
    setSelectedOrder(item)
    setIsOrderModalOpen(true)
    await fetchOrderItems(userId, item.id)
  }, [])

  const fetchOrderItems = useCallback(async (usrId, docId) => {
    setIsItemsLoading(true)
    const snapshot = await firestore.collection("stores")
      .doc(usrId.toString())
      .collection("orders")
      .doc(docId.toString())
      .collection("items")
      .get()

    const items = []
    snapshot.forEach(item => items.push(item.data()))

    setOrderItems(items)
    setIsItemsLoading(false)
  }, [])

  const closeOrderModal = useCallback(() => {
    setSelectedOrder(null)
    setIsOrderModalOpen(false)
    setOrderItems([])
  }, [])

  const [declineReason, setDeclineReason] = useState('')
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false)

  const openDeclineModal = useCallback(() => {
    setDeclineReason('')
    setIsDeclineModalOpen(true)
  }, [])

  const closeDeclineModal = useCallback(() => setIsDeclineModalOpen(false), [])

  const updateOrderStatus = useCallback(async (usrId, order, newStatus, reason = '') => {

    closeOrderModal()

    try {
      const { hasError, data } = await serverService.updateOrderStatus(order.id, newStatus, reason)
      if (hasError){
        toast.error('Something went wrong')
      }
    }
    catch (e) {
      toast.error("Null deytko")
    }

    closeDeclineModal()
    closeOrderModal()
  }, [firestore])


  const onAccept = useCallback(async () => {
    await updateOrderStatus(userId, selectedOrder, statuses.PACKING)
  }, [selectedOrder])

  const onReady = useCallback(async () => {
    await updateOrderStatus(userId, selectedOrder, statuses.ON_WAY)
  }, [selectedOrder])

  const onDecline = useCallback(async () => {
    await updateOrderStatus(userId, selectedOrder, statuses.DECLINED, declineReason)
  }, [selectedOrder, declineReason])

  const actions = {
    onAccept,
    onReady,
    onDecline,
    openDeclineModal
  }

  const fields = [
    { key: 'index', label: '#', _style: { width: '6%'} },
    { key: 'clientName', label: 'Client name', _style: { width: '22%'} },
    { key: 'clientAddress', label: 'Address', _style: { width: '30%'} },
    { key: 'status', label: 'Status', _style: { width: '16%'} },
    { key: 'dateOrder', label: 'Date', _style: { width: '16%'} },
    { key: 'totalCost', label: 'Total cost', _style: { width: '10%'} }
  ]

  const getStatusWithBadge = useCallback((statusId) => {
    switch (statusId) {
      case statuses.NEW: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="warning">New</CBadge>
      case statuses.PACKING: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="primary">Packing</CBadge>
      case statuses.PACKED: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="primary">Packed</CBadge>
      case statuses.ON_WAY: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="info">On way</CBadge>
      case statuses.DELIVERED: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="success">Delivered</CBadge>
      case statuses.DECLINED: return <CBadge style={{padding: '5px 10px', fontSize: 12}} color="danger">Declined</CBadge>
      default: return 'primary'
    }
  })

  return (
    <div>
      {
        isOrdersLoading ? <FullContentSpinner/> :
          <CDataTable
            items={status === 'all' ? orders : orders.filter(o => o.status === status)}
            fields={fields}
            tableFilter={{label: 'Filter', placeholder: 'Searching...'}}
            hover
            sorter
            clickableRows
            onRowClick={item => openOrderModal(item)}
            scopedSlots = {{
              'index':
                (item, index)=>(
                  <td>
                    # { index + 1 }
                  </td>
                ),
              'clientName':
                (item)=>(
                  <td>
                    {item.clientname || item.phone }
                  </td>
                ),
              'clientAddress':
                (item)=>(
                  <td>
                    {item.address}
                  </td>
                ),
              'status':
                (item)=>(
                  <td>
                    {getStatusWithBadge(item.status)}
                  </td>
                ),
              'dateOrder':
                (item)=>(
                  <td>
                    { toNormalDate(item.date.seconds, 'Today', 'Yesterday') }
                  </td>
                ),
              'totalCost':
                (item)=>(
                  <td>
                    {item.totalprice} <span className="TL">TL</span>
                  </td>
                ),
            }}
          />
      }
      {
        selectedOrder &&
        <CModal
          show={isOrderModalOpen}
          onClose={closeOrderModal}
          centered
          size="xl"
        >
          <CModalHeader closeButton>
            {/*<h6 className="d-inline-block">{ selectedOrder.clientName }</h6>*/}
            <div className="d-lg-inline-block ml-1">{ getStatusWithBadge(selectedOrder.orderStatus) }</div>
          </CModalHeader>
          <CModalBody>
            <OrderInfo selectedOrder={selectedOrder} orderItems={orderItems} isItemsLoading={isItemsLoading}/>
          </CModalBody>
          <CModalFooter>
            { getButtonsByStatus(selectedOrder.status, actions, firestoreLoading) }
          </CModalFooter>
        </CModal>
      }
      <>
        <CModal
          show={isDeclineModalOpen}
          onClose={closeDeclineModal}
          centered
        >
          <CModalHeader closeButton>
            Are you sure, you want to decline order ?
          </CModalHeader>
          <CModalBody>
            <CTextarea
              value={declineReason}
              onChange={e => setDeclineReason(e.target.value)}
              rows={4}
              placeholder="Write order decline reason..."
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className="px-4" onClick={onDecline}>Yes</CButton>
            <CButton color="secondary" className="px-4" onClick={closeDeclineModal}>No</CButton>
          </CModalFooter>
        </CModal>
      </>
      <>
        { firestoreLoading && <WithBgSpinner/> }
      </>
    </div>
  )
}

const getButtonsByStatus = (status, actions) => {
  switch (status){
    case statuses.NEW:
      return (
        <>
          <CButton color="primary" onClick={() => actions.onAccept()}>
            Accept order
          </CButton>
          <CButton color="danger" className="ml-3" onClick={() => actions.openDeclineModal()}>
            Reject order
          </CButton>
        </>
      )

    case statuses.PACKING:
      return (
        <>
          <CButton color="success" onClick={() => actions.onReady()}>
            Ready For delivery
          </CButton>
          <CButton color="danger" className="ml-3" onClick={() => actions.openDeclineModal()}>
            Reject order
          </CButton>
        </>
      )

    case statuses.ON_WAY:
      return (
        <>
          <CButton color="success" onClick={() => actions.onReady()}>
            Delivered
          </CButton>
          <CButton color="danger" className="ml-3" onClick={() => actions.openDeclineModal()}>
            Reject order
          </CButton>
        </>
      )

    case statuses.DELIVERED:
      return (
        <>
        </>
      )
  }
}

export default OrdersList
