import React, { useState, useEffect} from 'react';
import { Container, Nav, Row, Col,  Modal, Card, Button, Image, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useParams, NavLink} from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

import { IoPersonCircleOutline } from "react-icons/io5";
import { FaHeart, FaComment, FaEye } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

function MyModal() {
    const user_id = parseInt(localStorage.getItem("uid"));

    let { postId } = useParams();
    const previous_page = localStorage.getItem("pre_page"); // 0: library, 1: mystory
    const [show, setShow] = useState(true);

    const [arthorInfo, setAuthor] = useState([]);
    const [storyInfo, setStory] = useState([]);
    const [storyCover, setCover] = useState([]);
    const [isAuthor, setAuthorTrue] = useState(false);
    

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        if (previous_page === '0') {
            window.location.href = "/library";
        } else if (previous_page === '1') {
            window.location.href = "/mystory";
        }
        else {
            window.location.href = "/";
        }
        setShow(false);
    }

    const handleAuthorTrue = () => {
        // console.log(user_id);
        // console.log(storyInfo[0]?.user_id);
        if (user_id === storyInfo[0]?.user_id) {
            setAuthorTrue(true);
        }
        // console.log(isAuthor);
    }

    useEffect(() => {
        // get story info
        axios.get(`http://localhost:4000/posts/${postId}`)
            .then(response => {
                setStory(response.data.userPosts);
                const author_id = response.data.userPosts[0]?.user_id;
                // get author info
                axios.get(`http://localhost:4000/users/${author_id}`)
                    .then(response => {
                        setAuthor(response.data.user);
                        handleAuthorTrue();
                    })
            })
            .catch(error => {
                console.error('Error fetching story:', error);
            });

        // get story cover
        axios.get(`http://localhost:4000/contents/cover/${postId}`)
            .then(response => {
                setCover(response.data.postPage);
            })
            .catch(error => {
                console.error('Error fetching cover:', error);
            });

        // for frontend testing
        // setStory([
        //     { "post_id": 3, "user_id": 1, "title": "Test Book", "created_at": "2024-06-04T00:45:23.000Z", "likes_count": 0, "comments_count": 0, "story_category": "anime", "published": { "type": "Buffer", "data": [ 0 ] }}
        // ]);
        // setAuthor([
        //     { "user_id": 1, "email_address": "happy@gmail.com", "user_name": "R12528025", "user_password": "uuu" }
        // ]);
        // setCover([
        //     { "page_id": 3, "post_id": 2, "page_number": 3, "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Prick%C3%A4tarpucken.jpg", "content": "big fdswolf", "layout": "up" }
        // ]);
        // localStorage.setItem("uid", 2);
    }, [postId]);
    
    useEffect(() => {
        handleAuthorTrue();
    }, [storyInfo, user_id]);
  
    return (
        <>
        <Container className="viewstory-container"></Container>
            <Modal className="viewstory-modal" show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="close-btn" >
                <Modal.Title className="viewstory-arthor"><IoPersonCircleOutline className="viewstory-icon" /> {arthorInfo[0]?.user_name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={2} className="left-sidebar">
                        {/* Left Sidebar Content */}
                    </Col>
                    <Col xs={8} className="story-content">
                        <h1 className="story-title">{storyInfo[0]?.title}</h1>
                        <Image src={storyCover[0]?.image_url} fluid className="story-image" />
                        <div className="story-stats">
                            <Row>
                                <Col className="likes" xs={2}><FaHeart /> {storyInfo[0]?.likes_count}</Col>   
                                <Col className="comments" xs={2}><FaComment /> {storyInfo[0]?.comments_count}</Col>
                                <Col className="views" xs={2}><FaEye /></Col>
                                <Col className="share" xs={2}><FaShareAlt /></Col>
                            </Row>
                        </div>
                        <p className="story-category">{storyInfo[0]?.story_category}</p>
                        <p className="story-author">by {arthorInfo[0]?.user_name}</p>
                        <p className="story-date">{storyInfo[0]?.created_at.slice(0, 10)} created</p>
                        
                        <div className="story-description">
                            <h5>Description</h5>
                            <p></p>
                        </div>
                        {/* <div className="comments-section">
                            <h5>Comments</h5>
                            {story.commentsList.map((comment, index) => (
                                <p key={index} className="comment">{comment}</p>
                            ))}
                        </div> */}
                    </Col>
                    <Col xs={2} className="right-sidebar">
                        {/* Right Sidebar Content */}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {isAuthor && (
                    <Button as={NavLink} to={`/contents/modify/${postId}`} className="edit-btn">
                        EDIT
                    </Button>
                )}
                <Button as={NavLink} to={`/contents/${postId}`} className="view-btn">
                    VIEW
                </Button>
            </Modal.Footer>
            </Modal>
        {/* </Container> */}
        </>
    );
  }
  
  export default MyModal;
