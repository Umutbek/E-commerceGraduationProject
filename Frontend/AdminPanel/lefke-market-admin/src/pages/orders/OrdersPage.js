import React, {useEffect} from 'react'
import {
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
  CTabContent,
  CCard,
  CCardBody
} from "@coreui/react"
import OrdersList from "../../components/orders/OrderList"
import {statuses} from "../../constants/orders"
import {useDispatch} from "react-redux"
import {useFirestore} from "react-redux-firebase"
import {fetchAllOrders} from "../../redux/actions/ordersActions"

function OrdersPage() {

  const dispatch = useDispatch()
  const firestore = useFirestore()

  useEffect(() => {
    dispatch(fetchAllOrders(firestore))
  }, [])

  return (
    <>
      <CCard className="m-3">
        <CCardBody>
          <CTabs activeTab="new">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="all">
                  All
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="new">
                  New
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="packing">
                  Packing
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink data-tab="onWay">
                  On the way
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="delivered">
                  Delivered
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="declined">
                  Declined
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="all">
                <OrdersList/>
              </CTabPane>
              <CTabPane data-tab="new">
                <OrdersList status={statuses.NEW}/>
              </CTabPane>
              <CTabPane data-tab="packing">
                <OrdersList status={statuses.PACKING}/>
              </CTabPane>
              <CTabPane data-tab="onWay">
                <OrdersList status={statuses.ON_WAY}/>
              </CTabPane>
              <CTabPane data-tab="delivered">
                <OrdersList status={statuses.DELIVERED}/>
              </CTabPane>
              <CTabPane data-tab="declined">
                <OrdersList status={statuses.DECLINED}/>
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  )
}

export default OrdersPage
