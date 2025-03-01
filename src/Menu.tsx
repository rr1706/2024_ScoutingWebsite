import { Link, NavLink } from "react-router-dom";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import EventSelector from "./Utils/EventSelector";

export default function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={process.env.PUBLIC_URL + '/RRLogo.png'} className="img-fluid" style={{ maxHeight: '60px' }} alt="logo" />
                </NavLink>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav" className="justify-content-between">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <NavDropdown className="navBarOptions px-3" title="View Data">
                            <NavDropdown.Item as={Link} to="/matchstrategy">Match Strategy</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/picklist">Picklist</NavDropdown.Item>
                            {/*<NavDropdown.Item as={Link} to="/eventcharts">Event Charts</NavDropdown.Item>*/}
                            <NavDropdown.Item as={Link} to="/tba">Blue Alliance Data Dump</NavDropdown.Item>
                            </NavDropdown>
                        <NavDropdown className="navBarOptions px-3" title="Data Entry">
                            <NavDropdown.Item as={Link} to="/superscout">Super Scout Notes</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/matchdataimport">Match Data Import</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="navBarOptions px-3" title="Edit Data">
                            <NavDropdown.Item as={Link} to="/editmatch">Edit Match</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/verifymatchdata">Verify Match Data</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown className="navBarOptions px-3" title="Setup">
                            <NavDropdown.Item as={Link} to="/eventsetup">Event Setup</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/matchdataimport">Match Data Import</NavDropdown.Item>
                            {/*    <NavDropdown.Item as={Link} to="/schedulemaker">Scouting Scheduler</NavDropdown.Item>*/}
                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex justify-content-center">
                    <EventSelector />
                </div>
            </div>
        </Navbar>
    );
}

