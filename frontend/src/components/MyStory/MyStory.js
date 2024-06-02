import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Card, Button, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

function MyStory() {
    const [editingStories, setEditingStories] = useState([]);
    const [publishedStories, setPublishedStories] = useState([]);
    const user_id = localStorage.getItem("uid");
    const user_email = localStorage.getItem("uemail");
    const user_name = localStorage.getItem("uname");
    // for frontend testing
    // const user_email = "WEBAPP@gmail.com";
    // const user_name = "Group4";

    useEffect(() => {
        // editing stories
        axios.get('http://localhost:4000/posts/${user_id}/0')
        .then(response => {
            setEditingStories(response.data.userPosts);
        })
        .catch(error => {
            console.error('Error fetching editing stories:', error);
        });
        // published stories
        axios.get('http://localhost:4000/posts/${user_id}/1')
        .then(response => {
            setPublishedStories(response.data.userPosts);
        })
        .catch(error => {
            console.error('Error fetching published stories:', error);
        });
        
        // for frontend testing
        // setEditingStories([
        //     { "post_id": 4, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 0 ] } },
        //     { "post_id": 5, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 0 ] } },
        //     { "post_id": 6, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 0 ] } }
        // ]);
        // setPublishedStories([
        //     { "post_id": 1, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 1 ] } },
        //     { "post_id": 2, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 1 ] } },
        //     { "post_id": 3, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 1 ] } },
        //     { "post_id": 2, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 1 ] } },
        //     { "post_id": 3, "user_id": 1, "title": "wedfdday", "created_at": "2024-06-01T23:35:28.000Z", "likes_count": 0, "comments_count": 0, "story_category": "romatic", "published": { "type": "Buffer", "data": [ 1 ] } }
        // ]);
    }, [user_id]);

    return (
        <Container className="mystory-container">
            <Container className="personal-info">
                <Row>
                    <Col>
                        <Image className="head-photo"
                            src={require('../../assets/images/head_photo.png')}
                        />
                    </Col>
                    <Col className="info-text">
                        <Row className="user-info">
                            <Row>{user_name}</Row>
                            <Row>{user_email}</Row>
                        </Row>
                        <Row className="book-count">
                            <Row>In progress : {editingStories.length}</Row>
                            <Row>Published : {publishedStories.length}</Row>
                        </Row>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
            <Container className="line-shadow">
                <div></div>
            </Container>
            <Container className="works">
                <h1 className="title">In Progress 🕮</h1>
                <Row>
                    {editingStories.length > 0 ? (
                        editingStories.map((story) => (
                            <Col key={story.id} xs={12} sm={6} md={4} lg={3}>
                                <Link className="book-link" to={`/viewstory/${story.id}`}>
                                <Card className="book">
                                    <Card.Img variant="top" src={require('./test/cat.png')} />
                                    <Card.Body>
                                        <Card.Title>{story.title}</Card.Title>
                                        <Card.Text>{story.created_at.slice(0, 10)} created</Card.Text>
                                        <Button variant="primary">View</Button>
                                        {/* <Card.Link href="'/view/story/1">
                                            <Button variant="primary">View</Button>
                                        </Card.Link> */}
                                    </Card.Body>
                                </Card>
                                </Link>
                            </Col>
                        ))
                    ) : (
                        <p>No in-progress stories.</p>
                    )}
                </Row>
            </Container>
            <Container className="works">
                <h1 className="title">Published 🕮</h1>
                <Row>
                    {publishedStories.length > 0 ? (
                        publishedStories.map((story) => (
                            <Col key={story.id} xs={12} sm={6} md={4} lg={3}>
                                <Link className="book-link" to={`/viewstory/${story.id}`}>
                                <Card className="book">
                                    <Card.Img variant="top" src={require('./test/cat.png')} />
                                    <Card.Body>
                                        <Card.Title>{story.title}</Card.Title>
                                        <Card.Text>{story.created_at.slice(0, 10)} created</Card.Text>
                                        <Button variant="primary">View</Button>
                                    </Card.Body>
                                </Card>
                                </Link>
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
