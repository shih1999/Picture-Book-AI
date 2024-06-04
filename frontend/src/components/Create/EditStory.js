import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import getImage from './api/get-image';
import axios from 'axios';
// import { useParams } from "react-router-dom";


const EditStory = () => {
  // const {postId} = useParams();
  const postId = 1;
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [layout, setLayout] = useState('image-right'); // image-top, image-bottom, image-left, image-right
  const [searchTerm, setSearchTerm] = useState('');
  const [gallery, setGallery] = useState([]);
  // const [title, setTitle] = useState("");
  // const [postId, setpostId] = useState(5);

<<<<<<< Updated upstream

  useEffect(() => {
    
    axios.get('http://localhost:4000/contents/'+postId,
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      alert(res.data.message);
      setPages(res.data.postPages);

    })
    .catch((err) => {
      console.log(err);
    });
    
  }, []);


=======
  useEffect(() => {
    try {
      const response = axios.get('http://localhost:4000/contents/'+postId,
      {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = response.data;
      console.log(response);

      if (response.status === 200) {
          alert(data.message);
          setPages(data.postPages)
      }
    } catch (error) {
        alert('Error registering user');
    }
  }, []);

  // useEffect(() => {
  //   console.log(postID) 
  // },[postID])
>>>>>>> Stashed changes

  const goBackToHomePage = async () =>{
    window.location.href = "/";
  };

  // const handleAddPage = () => {
  //   const newPage = { page_id: pages.length + 1, post_id: postId, page_number: , "image_url": "dfsfa", "content": "big fdswolf", "layout": "up" };
  //   setPages([...pages, newPage]);
  //   setCurrentPage(newPage.id);
  // };

  // const handleDeletePage = () => {
  //   const updatedPages = pages.filter((page) => page.id !== currentPage);
  //   setPages(updatedPages);
  //   setCurrentPage(updatedPages.length > 0 ? updatedPages[0].id : null);
  // };

  const handleImageChange = (image) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPage ? { ...page, image_url : image } : page
    );
    setPages(updatedPages);
  };

  const handleTextChange = (text) => {
    const updatedPages = pages.map((page) =>
      page.id === currentPage ? { ...page, content : text } : page
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
    // try {
    //   const data = await getImage(searchTerm);
    //   if (data == "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg") {
    //     throw new Error("Error fetching data from chat-gpt API");
    //   }
      
    //   // Handle the response data as needed
      
    //   console.log("ChatGPT Response:", data);
    //   setGallery([...gallery, data]);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    setGallery([...gallery, "https://upload.wikimedia.org/wikipedia/commons/e/e5/Prick%C3%A4tarpucken.jpg"]);
    // setGallery(["https://via.placeholder.com/512","https://via.placeholder.com/512"])
    console.log(gallery)
  };

  const handleImageSelect = (image) => {
    handleImageChange(image);
  };

  const EditEveryPages = async (page) =>{
    let payload = {
      article: page.content,
      image_url: page.image_url
    };
    console.log(payload);
    try {
      const response = await axios.put('http://localhost:4000/contents/modify/'+page.page_id ,payload,
      {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const data = response.data;

      if (response.status === 201) {
          alert(data.message);
      }
    } catch (error) {
        alert('Error registering user');
    };
  };

  const handleEdit = async () => {
    
    for (let i = 0; i < pages.length; i += 1){
      // await console.log(pages[i])
      await EditEveryPages(pages[i]);
    };
    
    await goBackToHomePage();


    
  };

  return (
    <Container fluid className="story-section">
      <Row>
        <Col>
          <Button variant="primary" onClick={handleEdit} >
            Edit Story
          </Button>
        </Col>
      </Row>
      <Row >
        <Col md={2} className='story-page'>
          <h4>Pages</h4>
          {pages.map((page) => (
            <div
              key={page.page_id}
              onClick={() => setCurrentPage(page.page_id)}
              style={{ cursor: 'pointer' }}
            >
              <Image width={150}height={150} src={page.image_url} thumbnail />
            </div>
          ))}
          
        </Col>
        <Col md={7}>
          <h4>Editor</h4>
          <div className={`d-flex ${pages.find((page) => page.page_id === currentPage)?.layout}`}>
            {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-left') && (
              <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
            )}
            <div className="flex-grow-1">
              {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-top') && (
                <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
              )}
              <Form.Control
                className='w-100 h-100'
                id='page-text'
                as="textarea"
                value={pages.find((page) => page.page_id === currentPage)?.content}
                onChange={(e) => handleTextChange(e.target.value)}
              />
              {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-bottom') && (
                <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
              )}
            </div>
            {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-right') && (
              <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
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
      {/* <Row>
        <Col>
          <Button className='mt-2' variant="primary" onClick={handleAddPage}>
            Add Page
          </Button>
          <Button className='mt-2' variant="danger" onClick={handleDeletePage}>
            Delete Page
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
};

export default EditStory;