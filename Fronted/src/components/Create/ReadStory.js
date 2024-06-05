import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
// { page_id: 1, post_id: 1, page_number: 1, image_url: "https://via.placeholder.com/512", content: "big fdswolfsdsddsdsdsdsds", layout: "image-left" },
//   { page_id: 2, post_id: 1, page_number: 2, image_url: "https://via.placeholder.com/512", content: "爸爸媽媽一起出去玩，真的好開心喔", layout: "image-right" }

const ReadStory = () => {
  const {postId} = useParams();
  // const postId = 1;
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [gallery, setGallery] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:4000/contents/'+postId,
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
      console.log(res);
      console.log(res.data);
      // alert(res.data.message);
      setPages(res.data.postPages);
      setCurrentPage(res.data.postPages[0]["page_id"])
    })
    .catch((err) => {
      console.log(err);
    });
    
  }, []);


  return (
    <Container fluid className="story-section">
      <Row>
        <Col>
          {/* <Button variant="primary" onClick={handleEdit} >
            Edit Story
          </Button> */}
        </Col>
      </Row>
      <Row >
        <Col md={3} className='story-page '>
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
          
          <div className={`d-flex ${pages.find((page) => page.page_id === currentPage)?.layout}`}>
            {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-left') && (
              <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
            )}
            <div className="flex-grow-1 text-ba">
              {pages.find((page) => page.page_id === currentPage)?.layout.includes('image-top') && (
                <Image src={pages.find((page) => page.page_id === currentPage)?.image_url} fluid />
              )}
              <p className='w-100 h-100 text-center text-monospace px-1 lh-lg bg-white pt-5' id='page-text'>
                {pages.find((page) => page.page_id === currentPage)?.content}
              </p>
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
            {/* <Button variant="primary" onClick={() => handleLayoutChange('image-left')}>
              Image Left
            </Button>
            <Button variant="primary" onClick={() => handleLayoutChange('image-right')}>
              Image Right
            </Button> */}
          </div>
        </Col>
        <Col md={2} className='story-gallery'>
          
        </Col>
      </Row>
      
    </Container>
  );
};

export default ReadStory;