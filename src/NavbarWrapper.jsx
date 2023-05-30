import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Row, Col } from 'react-bootstrap'

function NavbarWrapper () {
  return (
        <Row className="border-bottom pt-2 pb-2 mb-5">
            <Col>
                <Navbar />
                <Outlet />
            </Col>
        </Row>
  )
}

export default NavbarWrapper
