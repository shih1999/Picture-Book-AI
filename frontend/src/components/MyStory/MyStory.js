import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

import headPhoto from '../../assets/images/head_photo.png';

import { FaBook, FaBookOpen } from "react-icons/fa";

function MyStory() {
    const [editingStories, setEditingStories] = useState([]);
    const [editingCovers, setEditingCovers] = useState({});
    const [publishedStories, setPublishedStories] = useState([]);
    const [publishedCovers, setPublishedCovers] = useState({});
    const user_id = localStorage.getItem("uid");
    const user_email = localStorage.getItem("uemail");
    const user_name = localStorage.getItem("uname");
    // for frontend testing
    // const user_email = "WEBAPP@gmail.com";
    // const user_name = "Group4";

    useEffect(() => {
        // fetching editing stories
        axios.get(`http://localhost:4000/posts/${user_id}/0`)
            .then(async response => {
                setEditingStories(response.data.userPosts);
                // editingIDs = response.data.userPosts.map(story => story.post_id);
                const editingIDs = response.data.userPosts.map(story => story.post_id);
                
                // get cover images
                const coverPromises = editingIDs.map(async editingID =>
                    axios.get(`http://localhost:4000/contents/cover/${editingID}`)
                        .then(async res => ({
                            id: editingID,
                            coverUrl: res.data.postPage.image_url
                    }))
                );
                const coverResults = await Promise.allSettled(coverPromises);
                const coversMap = coverResults.reduce((acc, cover) => {
                    if (cover.status === 'fulfilled') {
                        acc[cover.value.id] = cover.value.coverUrl;
                      } else {
                        console.error(`Failed to fetch cover for ID:`, cover.reason.message);
                      }
                    return acc;
                }, {});
                setEditingCovers(coversMap); 
            })
        .catch(error => {
            console.error('Error fetching editing story covers:', error);
        });
        
        // published stories
        axios.get(`http://localhost:4000/posts/${user_id}/1`)
        .then(async response => {
            setPublishedStories(response.data.userPosts);
            // publishedIDs = response.data.userPosts.map(story => story.post_id);
            const publishedIDs = response.data.userPosts.map(story => story.post_id);
            
            // get cover images
            const coverPromises = publishedIDs.map(async publishedID =>
                axios.get(`http://localhost:4000/contents/cover/${publishedID}`)
                    .then(async res => ({
                        id: publishedID,
                        coverUrl: res.data.postPage.image_url
                }))
            );
            const coverResults = await Promise.allSettled(coverPromises);
            const coversMap = coverResults.reduce((acc, cover) => {
                if (cover.status === 'fulfilled') {
                    acc[cover.value.id] = cover.value.coverUrl;
                  } else {
                    console.error(`Failed to fetch cover for ID:`, cover.reason.message);
                  }
                return acc;
            }, {});
            setPublishedCovers(coversMap); 
        })
        .catch(error => {
            console.error('Error fetching published story covers:', error);
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

    const handleLinkClick = () => {
        localStorage.setItem("pre_page", 1);
    };

    return (
        <Container className="mystory-container">
            <Container className="personal-info">
                <Row>
                    <Col>
                        <Image className="head-photo"
                            src={headPhoto} alt="head photo"
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
                <h1 className="title">In Progress <FaBookOpen/></h1>
                <Row>
                    {editingStories.length > 0 ? (
                        editingStories.map((story) => (
                            <Col key={story.post_id} xs={12} sm={6} md={4} lg={3}>
                                <Link className="book-link" to={`/viewstory/${story.post_id}`} onClick={() => handleLinkClick()}>
                                <Card className="book">
                                    <Card.Img variant="top" src={editingCovers[story.post_id]} />
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
                <h1 className="title">Published <FaBook /></h1>
                <Row>
                    {publishedStories.length > 0 ? (
                        publishedStories.map((story) => (
                            <Col key={story.post_id} xs={12} sm={6} md={4} lg={3}>
                                <Link className="book-link" to={`/viewstory/${story.post_id}`}>
                                <Card className="book">
                                    <Card.Img variant="top" src={publishedCovers[story.post_id]}/>
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
