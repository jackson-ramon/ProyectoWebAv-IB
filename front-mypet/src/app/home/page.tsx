'use client'

import { 
  Container, 
  Header, 
  Sidebar, 
  Sidenav, 
  Content, 
  Navbar, 
  Nav 
} from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import { useState } from 'react';

import 'rsuite/dist/rsuite.min.css';
import { Panel } from 'rsuite';
import StockProductos from '../products/page';
import ChatPage from '../chat/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldDog } from '@fortawesome/free-solid-svg-icons'

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const NavToggle = ({ expand, onChange }: { expand: boolean, onChange: () => void }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} />}
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

// TODO: Usar el archivo middleware para ingresar a esta página
export default function HomePage () {
  const [expand, setExpand] = useState(true);
  const [openTab, setOpenTab] = useState("1");

  const handleSelect = (eventKey: string) => {
    setOpenTab(eventKey);
  };

  return (
    <div className="sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column', border: "1px solid #4F979C" }}
          width={expand ? 240 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles} className='align-middle'>
              <FontAwesomeIcon icon={faShieldDog} fontSize={30} />
              {expand ? <span style={{ marginLeft: 12 }}>My Pet</span> : ""}
            </div>
          </Sidenav.Header>
          <Sidenav 
            expanded={expand} 
            defaultOpenKeys={['3']} 
            appearance="subtle" 
            style={expand ? { height: "85vh" } : { height: "75vh" } }
          >
            <Sidenav.Body>
              <Nav onSelect={(e) => handleSelect(e)}>
                <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                  Stock de productos
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  Chat de emprendedores
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
            <ChatPage />
          )}
        </Panel>
      </Container>
    </div>
  );
}