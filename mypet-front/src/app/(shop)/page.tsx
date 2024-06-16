'use client';

import Container from 'rsuite/Container';
import Header from 'rsuite/Header';
import Sidebar from 'rsuite/Sidebar';
import Sidenav from 'rsuite/Sidenav';
import Content from 'rsuite/Content';
import Navbar from 'rsuite/Navbar';
import Nav from 'rsuite/Nav';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import { useState } from 'react';

import 'rsuite/dist/rsuite.min.css';
import StockProductos from './products/page';
import { Panel } from 'rsuite';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default function Home() {
  const [expand, setExpand] = useState(true);
  const [openTab, setOpenTab] = useState("1");

  const handleSelect = (eventKey: string) => {
    setOpenTab(eventKey);
  };

  return (
    <div className="sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 240 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <span style={{ marginLeft: 12 }}>Bienvenido Jackson</span>
            </div>
          </Sidenav.Header>
          <Sidenav 
            expanded={expand} 
            defaultOpenKeys={['3']} 
            appearance="subtle" 
            style={expand ? { height: "80vh" } : { height: "70vh" } }
          >
            <Sidenav.Body>
              <Nav onSelect={(e) => handleSelect(e)}>
                <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                  Stock de productos
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  Registrar productos
                </Nav.Item>
                {/* <Nav.Menu
                  eventKey="3"
                  trigger="hover"
                  title="Advanced"
                  icon={<MagicIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="3-1">Geo</Nav.Item>
                  <Nav.Item eventKey="3-2">Devices</Nav.Item>
                  <Nav.Item eventKey="3-3">Brand</Nav.Item>
                  <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                  <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                </Nav.Menu> */}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Panel bordered className='m-4 w-100' style={{ border: "1px solid #4F979C" }}>
          {openTab === "1" && (
            <StockProductos />
          )}
          {openTab === "2" && (
            <Container>
              <Header>
                <h2>User Group</h2>
              </Header>
              <Content>User Group Content</Content>
            </Container>
          )}
        </Panel>
      </Container>
    </div>
  );
}
