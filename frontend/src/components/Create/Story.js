import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Image } from 'react-bootstrap';
import getImage from './api/get-image';

const ChildBookEditor = () => {
  const [pages, setPages] = useState([{ id: 1, image: null, text: '' }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState('image-top'); // image-top, image-bottom, image-left, image-right
  const [searchTerm, setSearchTerm] = useState('');
  const [gallery, setGallery] = useState([]);

  const handleAddPage = () => {
    const newPage = { id: pages.length + 1, image: null, text: '' };
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
    setLayout(newLayout);
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
    setGallery([...gallery, "https://via.placeholder.com/512"]);
    // setGallery(["https://via.placeholder.com/512","https://via.placeholder.com/512"])
    console.log(gallery)
  };

  const handleImageSelect = (image) => {
    handleImageChange(image);
  };

  const handleSave = () => {
    // Save book data
  };

  return (
    <Container fluid className="project-section">
      <Row>
        <Col md={2}>
          <h4>Pages</h4>
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              style={{ cursor: 'pointer' }}
            >
              <Image width={200}height={200} src={page.image} thumbnail />
            </div>
          ))}
          <Button variant="primary" onClick={handleAddPage}>
            Add Page
          </Button>
          <Button variant="danger" onClick={handleDeletePage}>
            Delete Page
          </Button>
        </Col>
        <Col md={7}>
          <h4>Editor</h4>
          <div className={`d-flex ${layout}`}>
            {layout.includes('image-left') && (
              <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
            )}
            <div className="flex-grow-1">
              {layout.includes('image-top') && (
                <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
              )}
              <Form.Control
                id='page-text'
                as="textarea"
                value={pages.find((page) => page.id === currentPage)?.text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
              {layout.includes('image-bottom') && (
                <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
              )}
            </div>
            {layout.includes('image-right') && (
              <Image src={pages.find((page) => page.id === currentPage)?.image} fluid />
            )}
          </div>
          <div className="d-flex justify-content-around mt-3">
            <Button variant="primary" onClick={() => handleLayoutChange('image-top')}>
              Image Top
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-bottom')}>
              Image Bottom
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-left')}>
              Image Left
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-right')}>
              Image Right
            </Button>
          </div>
        </Col>
        <Col md={3}>
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
              <Button onClick={handleSearchTermChange} variant="danger" type="submit">
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
              <Image width={200} height={200} src={image} thumbnail />
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleSave}>
            Save Book
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ChildBookEditor;