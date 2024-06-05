import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import anime from "../../assets/Styles/Anime.jpg"
import oilpainting from "../../assets/Styles/OilPainting.jpg"
import cartoon from "../../assets/Styles/cartoon.jpg"
import watercolor from "../../assets/Styles/watercolor.jpg"
import scifi from "../../assets/Styles/scifi.jpg"
import sketch from "../../assets/Styles/sketch.jpg"

function ChooseStyle() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          Select a style you like <strong className="red"> </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={sketch} alt="card-img" />
            <Card.Body className="mx-auto">
            <Card.Title className="project-card-title">Sketch</Card.Title>
              {(
                <Button
                  variant="danger"
                  href="/story"
                  onClick={() => {localStorage.setItem('style', 'sketch')}}
                >
                  <CgWebsite /> &nbsp;
                  {"Select"}
                </Button>
              )}
            </Card.Body>
          </Card>
          </Col>

          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={cartoon} alt="card-img" />
              <Card.Body className="mx-auto">
              <Card.Title className="project-card-title">Cartoon</Card.Title>
                {(
                  <Button
                    variant="danger"
                    href="/story"
                    onClick={() => {localStorage.setItem('style', 'cartoon')}}
                  >
                    <CgWebsite /> &nbsp;
                    {"Select"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
          

          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={anime} alt="card-img" />
              <Card.Body className="mx-auto">
              <Card.Title className="project-card-title">Anime</Card.Title>
                {(
                  <Button
                    variant="danger"
                    href="/story"
                    onClick={() => {localStorage.setItem('style', 'anime')}}
                  >
                    <CgWebsite /> &nbsp;
                    {"Select"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={oilpainting} alt="card-img" />
              <Card.Body className="mx-auto">
              <Card.Title className="project-card-title">Oil Painting</Card.Title>
                {(
                  <Button
                    variant="danger"
                    href="/story"
                    onClick={() => {localStorage.setItem('style', 'oil painting')}}
                  >
                    <CgWebsite /> &nbsp;
                    {"Select"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={watercolor} alt="card-img" />
              <Card.Body className="mx-auto">
              <Card.Title className="project-card-title">Watercolor</Card.Title>
                {(
                  <Button
                    variant="danger"
                    href="/story"
                    onClick={() => {localStorage.setItem('style', 'watercolor')}}
                  >
                    <CgWebsite /> &nbsp;
                    {"Select"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="project-card">
          <Card className="project-card-view">
            <Card.Img variant="top" src={scifi} alt="card-img" />
              <Card.Body className="mx-auto">
              <Card.Title className="project-card-title">SciFi</Card.Title>
                {(
                  <Button
                    variant="danger"
                    href="/story"
                    onClick={() => {localStorage.setItem('style', 'scifi')}}
                  >
                    <CgWebsite /> &nbsp;
                    {"Select"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ChooseStyle;
