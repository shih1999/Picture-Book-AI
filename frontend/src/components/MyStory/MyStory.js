import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image} from 'react-bootstrap';
import '../../App.css';
import axios from 'axios';

function MyStory() {
    const [inProgressStories, setInProgressStories] = useState([]);
    const [publishedStories, setPublishedStories] = useState([]);

    useEffect(() => {
        // Mock data
        setInProgressStories([
            { id: 1, title: "Story 1", description: "This is an in-progress story." },
            { id: 2, title: "Story 2", description: "This is another in-progress story." },
            { id: 3, title: "Story 3", description: "This is another in-progress story." },
            { id: 4, title: "Story 4", description: "This is another in-progress story." },
        ]);

        setPublishedStories([
            { id: 1, title: "Published Story 1", description: "This is a published story." },
            { id: 2, title: "Published Story 2", description: "This is another published story." }
        ]);
    }, []);

    return (
        <Container className="mystory-container">
            <Container className="personal-info">
                <Row>
                    <Col>
                        <Image
                            src={require('./test/cat.png')}
                            roundedCircle
                            width={200}
                            height={200}
                        />
                    </Col>
                    <Col className="info-text">
                        <Row className="user-info">
                            {/* <Row>{localStorage.getItem("uname")}</Row> */}
                            <Row>Username</Row>
                            <Row>email</Row>
                        </Row>
                        <Row className="book-count">
                            <Row>Creating : {inProgressStories.length}</Row>
                            <Row>Published : {publishedStories.length}</Row>
                        </Row>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            <Container className="line-shadow">
                <div></div>
            </Container>
            <Container className="works">
                <h1>In Progress</h1>
                <Row>
                    {inProgressStories.length > 0 ? (
                        inProgressStories.map((story) => (
                            <Col key={story.id} xs={12} sm={6} md={4} lg={3}>
                                <Card className="book">
                                    <Card.Img variant="top" src={require('./test/cat.png')} />
                                    <Card.Body>
                                        <Card.Title>{story.title}</Card.Title>
                                        {/* <Card.Text>{story.description}</Card.Text> */}
                                        <Button variant="primary">View</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No in-progress stories.</p>
                    )}
                </Row>
            </Container>
            <Container className="works">
                <h1>Published</h1>
                <Row>
                    {publishedStories.length > 0 ? (
                        publishedStories.map((story) => (
                            <Col key={story.id} xs={12} sm={6} md={4} lg={3}>
                                <Card className="book">
                                    <Card.Img variant="top" src={require('./test/cat.png')} />
                                    <Card.Body>
                                        <Card.Title>{story.title}</Card.Title>
                                        {/* <Card.Text>{story.description}</Card.Text> */}
                                        <Button variant="primary">View</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No published stories.</p>
                    )}
                </Row>
            </Container>
        </Container>
    );
}

export default MyStory;
