import React, { useState, useEffect } from 'react';
import { Container, Nav, Row, Col, Card, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import '../../App.css';
import axios from 'axios';

function Library() {
    const [allStories, setAllStories] = useState([]);

    useEffect(() => {
        // Mock data
        setAllStories([
            { id: 1, title: "My Faraway Lover", author: "Dahun", views: 3872, likes: 111, comments: 154, image: 'path/to/story-image1.jpg' },
            { id: 2, title: "Story 2", author: "Author 2", views: 1234, likes: 56, comments: 78, image: 'path/to/story-image2.jpg' },
            { id: 3, title: "Story 3", author: "Author 3", views: 5678, likes: 89, comments: 90, image: 'path/to/story-image3.jpg' },
            { id: 4, title: "Story 4", author: "Author 4", views: 4321, likes: 23, comments: 45, image: 'path/to/story-image4.jpg' },
        ]);
    }, []);

    return (
        <Container fluid className="library-container">
            <Row>
                <Col xs={3} id="sidebar-wrapper" className="category-select">
                    <Nav className="flex-column">
                        <Nav.Link href="#category1" className="category-btn">Category 1</Nav.Link>
                        <Nav.Link href="#category2" className="category-btn">Category 2</Nav.Link>
                        <Nav.Link href="#category3" className="category-btn-2">Category 3</Nav.Link>
                        {/* Add more categories as needed */}
                    </Nav>
                </Col>
                <Col>
                    <Row>
                        <h1 className="library-title">LIBRARY</h1>
                    </Row>
                    <Row className="sort-method">
                        <ToggleButtonGroup type="checkbox">
                            <ToggleButton id="tbg-btn-1" value={1} className="sort-btn">
                                Hottest
                            </ToggleButton>
                            <ToggleButton id="tbg-btn-2" value={2} className="sort-btn">
                                Newest
                            </ToggleButton>
                            <ToggleButton id="tbg-btn-3" value={3} className="sort-btn">
                                Oldest
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <Row>
                        <Container className="books">
                            <Row>
                                {allStories.length > 0 ? (
                                    allStories.map((story) => (
                                        <Col key={story.id} xs={12} sm={6} md={4} lg={3}>
                                            <Card className="book">
                                                {/* <Card.Img variant="top" src={story.image} /> */}
                                                <Card.Img variant="top" src={require('./test/cat.png')} />
                                                <Card.Body>
                                                    <Card.Title className="story-title">{story.title}</Card.Title>
                                                    <Card.Text className="story-author">by {story.author}</Card.Text>
                                                    <div className="story-status">
                                                        <span className="story-views"><i className="fas fa-eye">👁</i>{story.views}</span>
                                                        <span className="story-likes"><i className="fas fa-heart">❤︎</i>{story.likes}</span>
                                                        <span className="story-comments"><i className="fas fa-comment">💬</i>{story.comments}</span>
                                                    </div>
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Library;
