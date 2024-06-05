import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import getImage from './api/get-image';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

// import { text } from 'body-parser';


const ChildBookEditor = () => {
  const [pages, setPages] = useState([{ id: 1, image: null, text: '' , layout:"image-right"}]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [layout, setLayout] = useState('image-right'); // image-top, image-bottom, image-left, image-right
  const [searchTerm, setSearchTerm] = useState('');
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [postID, setPostID] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goBackToHomePage = async () =>{
    window.location.assign("/mystory");
  };

  const handleAddPage = () => {
    const newPage = { id: pages.length + 1, image: null, text: '', layout:"image-right"};
    setPages([...pages, newPage]);
    setCurrentPage(newPage.id);
  };

  const handleDeletePage = () => {
    const updatedPages = pages.filter((page) => page.id !== currentPage);
    setPages(updatedPages);
    setCurrentPage(updatedPages.length > 0 ? updatedPages[0].id : null);
  };

  const handleImageChange = (image) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPage ? { ...page, image } : page
    );
    setPages(updatedPages);
  };

  const handleTextChange = (text) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPage ? { ...page, text } : page
    );
    setPages(updatedPages);
  };

  const handleLayoutChange = (newLayout) => {
    // console.log(newLayout)
    const updatedPages = pages.map((page) =>
      page.id === currentPage ? { ...page, layout: newLayout } : page
    );
    // console.log(updatedPages)
    setPages(updatedPages);
  };

  const handleSearchTermChange = async (e) => {
    e.preventDefault();
    try {
      const data = await getImage(searchTerm);
      if (data == "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg") {
        throw new Error("Error fetching data from chat-gpt API");
      }
      
      // Handle the response data as needed
      
      console.log("ChatGPT Response:", data);
      setGallery([...gallery, data]);
    } catch (error) {
      console.error("Error:", error);
    }
    // setGallery([...gallery, "https://i.ibb.co/r5M9NB6/b48b8c8bfa6bac8453a03a0213d3a0ed2fd8d7b4ab05ab4880c442597c4faee8.png"]);
    // setGallery(["https://via.placeholder.com/512","https://via.placeholder.com/512"])
    console.log(gallery)
  };

  const handleImageSelect = (image) => {
    handleImageChange(image);
  };

  const SaveEveryPages = async (page, postID) =>{
    let payload = {
      post_id: postID,
      page_number: page.id,
      image_url: page.image,
      content: page.text,
      layout: page.layout
    };
    console.log(payload);
    try {
      const response = await axios.post('http://localhost:4000/contents/create',payload,
      {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = response.data;

      if (response.status === 201) {
          //alert(data.message);
      }
    } catch (error) {
        //alert('Error registering user');
    };
  };

  const handleSave = async () => {
    const payload = {
      user_id: localStorage.getItem("uid"),
      title: title,
      story_category: localStorage.getItem("style")
    };

    try {
        const response = await axios.post('http://localhost:4000/posts/create',payload,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        const data = response.data;
        console.log(data);
        // if (response.status === 200) {
        //   // //alert("Login successful");
        //   console.log(data.post_id)
          

        // }

        if (response.status === 201) {
          
            //alert(data.message);
            const newPostID = data.post_id;
            setPostID(data.post_id);
            console.log(newPostID);
            // setPostID(data.post_id);
            
            for (let i = 0; i < pages.length; i += 1) {
              await SaveEveryPages(pages[i], newPostID);
            }
            handleShow();
            // handleClose();
            
            // goBackToHomePage();
          }
        } catch (error) {
          //alert('Error registering user');
        }
      };
    const handlePublish = async () => {
      try {
        const response = await axios.put('http://localhost:4000/posts/publish/'+postID ,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = response.data;

        if (response.status === 200) {
            //alert(data.message);
        }
      } catch (error) {
          //alert('Error registering user');
      };
      handleClose()
      
      await goBackToHomePage();


      
    };

    const handleCloseTooHomepage =  () => {
      handleClose();
      goBackToHomePage();
    };
  
  return (
    <Container fluid className="story-section">
      <Row>
        <Col md = {{ span: 4 , offset: 3 }}>
          <Form.Control  
            type="text" 
            placeholder="Write Your Title" 
            onChange = {(e) => setTitle(e.target.value)}
            value = {title}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={handleSave} >
            Save Story
          </Button>
        </Col>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Do you want to publish?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Publish your work to your friends</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTooHomepage}>
              Just Save
            </Button>
            <Button variant="success" onClick={handlePublish}>
              Publish
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row >
        <Col md={2} className='story-page'>
          <h4>Pages</h4>
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              style={{ cursor: 'pointer' }}
            >
              <Image width={150}height={150} src={page.image} thumbnail />
            </div>
          ))}
          
        </Col>
        <Col md={7}>
          <h4>Editor</h4>
          <div className={`d-flex ${pages.find((page) => page.id === currentPage)?.layout}`}>
            {pages.find((page) => page.id === currentPage)?.layout.includes('image-left') && (
              <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
            )}
            <div className="flex-grow-1">
              {pages.find((page) => page.id === currentPage)?.layout.includes('image-top') && (
                <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
              )}
              <Form.Control
                className='w-100 h-100'
                id='page-text'
                as="textarea"
                value={pages.find((page) => page.id === currentPage)?.text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
              {pages.find((page) => page.id === currentPage)?.layout.includes('image-bottom') && (
                <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
              )}
            </div>
            {pages.find((page) => page.id === currentPage)?.layout.includes('image-right') && (
              <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
            )}
          </div>
          <div className="d-flex justify-content-around mt-3">
            {/* <Button variant="primary" onClick={() => handleLayoutChange('image-top')}>
              Image Top
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-bottom')}>
              Image Bottom
            </Button> */}
            <Button variant="primary" onClick={() => handleLayoutChange('image-left')}>
              Image Left
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-right')}>
              Image Right
            </Button>
          </div>
        </Col>
        <Col md={3} className='story-gallery'>
          <h4>Gallery</h4>
          <Form>
            <Form.Group controlId='prompt'>
              <Form.Label>Search Images</Form.Label>
              <Form.Control 
                type = "text"
                placeholder = "Search images..."
                onChange = {(e) => setSearchTerm(e.target.value)}
                value = {searchTerm}
              />
            </Form.Group>
            <Form.Group controlId='submit'>
              <Button className='m-2' onClick={handleSearchTermChange} variant="danger" type="submit">
                Submit
              </Button>
            </Form.Group>
            
          </Form>
          {gallery.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageSelect(image)}
              style={{ cursor: 'pointer' }}
            >
              <Image width={150} height={150} src={image} thumbnail />
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className='mt-2' variant="primary" onClick={handleAddPage}>
            Add Page
          </Button>
          <Button className='mt-2' variant="danger" onClick={handleDeletePage}>
            Delete Page
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChildBookEditor;