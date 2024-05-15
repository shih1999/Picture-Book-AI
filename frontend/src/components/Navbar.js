import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import {
  AiFillCreditCard ,
  AiOutlineFundProjectionScreen,
  AiOutlineFolderAdd,
} from "react-icons/ai";

import { GrGroup } from "react-icons/gr";
import axios from "axios";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  
  let login = localStorage.getItem("access_token");

  const logout = () => {
    var access_token = "";
    access_token = localStorage.getItem("access_token");
    axios.post('https://web-app-backend-r3ac.onrender.com/logout', null,{ headers: {Authorization : `Bearer ${access_token}`}})
      .then(res => {
        console.log(res.data);
        window.open('/', '_self');
      })
      .catch(error => {

        console.error('Error:', error);
      });
      // setLogin(true);
      // window.open('/', '_blank');
      localStorage.clear();
  }
  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          PictureBook.ai
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          {/* <span></span>
          <span></span>
          <span></span> */}
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link href="#pricing" onClick={() => updateExpanded(false)}>
                <AiFillCreditCard style={{ marginBottom: "2px" }} /> Pricing
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/ChooseStyle"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFolderAdd style={{ marginBottom: "2px" }} /> Create
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Community"
                onClick={() => updateExpanded(false)}
              >
                <GrGroup style={{ marginBottom: "2px" }} /> Community
              </Nav.Link>
            </Nav.Item>

            {login !== null && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/mystory"
                  onClick={() => updateExpanded(false)}
                >
                  <AiOutlineFundProjectionScreen
                    style={{ marginBottom: "2px" }}
                  />{" "}
                  My Story
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item className="fork-btn">
              {login === null ? <Button
                href="/login"
                className="fork-btn-inner"
                variant="danger"
                // onClick={() => setLogin(false)}
              >Login/Signup
              </Button>
              :
              <Button
                onClick={logout}
                // href="/"
                className="fork-btn-inner"
                variant="danger"
              >Logout
              </Button>}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
