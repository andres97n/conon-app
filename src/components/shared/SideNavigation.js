import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import {Ripple} from "primereact/ripple";

const SideSubmenu = (props) => {

  const [activeIndex, setActiveIndex] = useState(null)

  const onMenuItemClick = (event, item, index) => {
      //avoid processing disabled items
      if (item.disabled) {
          event.preventDefault();
          return true;
      }

      //execute command
      if (item.command) {
          item.command({ originalEvent: event, item: item });
      }

      if (index === activeIndex)
          setActiveIndex(null);
      else
          setActiveIndex(index);

      if (props.onMenuItemClick) {
          props.onMenuItemClick({
              originalEvent: event,
              item: item
          });
      }
  }

  const renderLinkContent = (item) => {
      let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
      let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;
      return (
          <React.Fragment>
              <i className={item.icon}></i>
              <span>{item.label}</span>
              {submenuIcon}
              {badge}
              <Ripple/>
          </React.Fragment>
      );
    }
    
    const renderLink = (item, i) => {
      let content = renderLinkContent(item);
      if (item.to) {
          return (
              <NavLink 
                target={item.target}
                to={item.to} 
                exact 
                className="p-ripple" 
                activeClassName="router-link-active router-link-exact-active" 
                onClick={(e) => onMenuItemClick(e, item, i)} 
              >
                  {content}
              </NavLink>
          )
      }
      else {
          return (
              <a 
                href={item.url} 
                className="p-ripple" 
                onClick={(e) => onMenuItemClick(e, item, i)} 
                target={item.target}
              >
                  {content}
              </a>
          );
      }
  }

  let items = props.items && props.items.map((item, i) => {
      let active = activeIndex === i;
      let styleClass = classNames(
          item.badgeStyleClass, 
          {'layout-menuitem-category': props.root, 'active-menuitem': active && !item.to }
      );

      if(props.root) {
          return (
              <li className={styleClass} key={i}>
                  {props.root === true && <React.Fragment>
                      <div className="layout-menuitem-root-text">{item.label}</div>
                      <SideSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                  </React.Fragment>}
              </li>
          );
      }
      else {
          return (
              <li className={styleClass} key={i}>
                  {renderLink(item, i)}
                <CSSTransition 
                    classNames="layout-submenu-wrapper" 
                    timeout={{ enter: 1000, exit: 450 }} 
                    in={active} 
                    unmountOnExit
                >
                    <SideSubmenu 
                        items={item.items} 
                        onMenuItemClick={props.onMenuItemClick} 
                    />
                </CSSTransition>
              </li>
          );
      }
  });

  return items ? <ul className={props.className}>{items}</ul> : null;
}

export const SideNavigation = (props) => {
  
    return (

        <div className="layout-menu-container">
            <SideSubmenu 
                items={props.model} 
                className="layout-menu" 
                onMenuItemClick={props.onMenuItemClick} 
                root={true} 
            />
          {/* <NavLink 
                to='/' 
                exact 
                className="mt-5 p-ripple" 
                activeClassName="router-link-active router-link-exact-active" 
                // onClick={(e) => onMenuItemClick(e, item, i)} 
          >
              Crear Tema de Estudio
          </NavLink> */}
          {/* <a href="https://www.primefaces.org/primeblocks-react" className="block mt-3">
              <img alt="primeblocks" className="w-full"
                  src={props.layoutColorMode === 'light' ? 'assets/layout/images/banner-primeblocks.png' : 'assets/layout/images/banner-primeblocks-dark.png'}/>
          </a> */}
        </div>

        // <Navbar 
        //   bg='dark'
        //   className='conon_sidebar'
        //   style={{ color:'white' }}
        // >
        //   <Navbar.Toggle aria-controls="navbarScroll" />
        //   <Navbar.Collapse id="navbarScroll">
        //   <div data-bs-spy="scroll" data-bs-offset="0" tabIndex='0'>
        //   <Nav 
        //   defaultActiveKey="/home" 
        //   className="flex-column"
        //   variant='tabs'
        //   fill
        //   justify
        //   >
        //     <Navbar.Text className='text-center'>
        //       <h5>MENU</h5>
        //     </Navbar.Text>
        //     <Nav.Item>
        //       <Nav.Link href="/home">Dashboard</Nav.Link>
        //     </Nav.Item>
        //     <hr style={{ color:'whitesmoke', width:'6rem' }}/>
        //     <Nav.Item>
        //     <NavDropdown title="Dropdown" id="nav-dropdown" active>
        //       <NavDropdown.Item eventKey="admin-1.1">Action</NavDropdown.Item>
        //       <NavDropdown.Item eventKey="admin-1.2">Another action</NavDropdown.Item>
        //     </NavDropdown>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-2">Docentes</Nav.Link> 
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-3">Estudiantes</Nav.Link>
        //     </Nav.Item>
        //     <hr style={{ color:'whitesmoke', width:'6rem' }}/>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-4">Períodos Lectivos</Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-5">Áreas de Conocimiento</Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-6">Asignaturas</Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-7">Aulas</Nav.Link>
        //     </Nav.Item>
        //     <hr style={{ color:'whitesmoke', width:'6rem' }}/>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-8">Temas de Estudio</Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-9">Glosarios</Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //       <Nav.Link eventKey="admin-10">Mensajes</Nav.Link>
        //     </Nav.Item>
        //   </Nav>
        //   </div>
        //   </Navbar.Collapse>
        // </Navbar>
        
    )
}
