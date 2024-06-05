import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';

const pricingData = [
  {
    id: 1,
    plan: 'Basic',
    price: '£49',
    features: ['Wireframing', 'Visual Design', '5 pages', 'Free Hosting', 'Support & Assistance'],
    link: 'https://www.google.com'
  },
  {
    id: 2,
    plan: 'Premium',
    price: '£149',
    features: ['Wireframing', 'Visual Design', '15 pages', 'Free Hosting', 'Support & Assistance'],
    link: 'https://www.facebook.com'
  },
  {
    id: 3,
    plan: 'Ultimate',
    price: '£349',
    features: ['Wireframing', 'Visual Design', 'Unlimited pages', 'Free Hosting', 'Support & Assistance'],
    link: 'https://www.twitter.com'
  }
]

var heroData = [
  {
    id: 1,
    image: require('../../assets/images/choose_story.jpg'),
    title: 'Choose Your Own Story Type',
    description: 'Tailor your online presence with a platform that celebrates your uniqueness in every interaction.',
    link: 'https://www.google.com'
  },
  {
    id: 2,
    image: require('../../assets/images/making_book.jpg'),
    title: 'Make Your Own Story',
    description: 'Shape your digital image with a platform that merges personalized options and cutting-edge advancements.',
    link: 'https://www.facebook.com'
  },
  {
    id: 3,
    image: require('../../assets/images/sharing_book.jpg'),
    title: 'Share With Your Friends',
    description: 'Uncover your distinct style at our site – the ultimate hub for tailored web journeys.',
    link: 'https://www.twitter.com'
  }
]

function Home() {
  return (
    <section id="home" className="hero-block">
       <Carousel>
          {
            heroData.map(hero => {
              return (
                <Carousel.Item key={hero.id}>
                  <img
                    className="d-block w-100 h-50"
                    src={hero.image}
                    alt={"slide " + hero.id}
                  />
                  <Carousel.Caption>
                    <h2>{hero.title}</h2>
                    <p>{hero.description}</p>
                    <a className="btn btn-primary" href={hero.link}>Learn More <i className="fas fa-chevron-right"></i></a>
                  </Carousel.Caption>             
                </Carousel.Item>
              );
            })
          }
      </Carousel>
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row>
            <Col  className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
              <span className="black"> INTRODUCTION </span>
              </h1>
              <p className="home-about-body">
                PictureBook is a creative haven where users collaborate seamlessly with AI to craft enchanting picture books. 
                <br />
                <br />With an intuitive interface and a palette of AI-powered tools, you can bring their stories to life through vibrant illustrations, personalized characters, and captivating narratives.
                <br />
                <br />
                Join PictureBook today and unlock the door to a world where creativity knows no bounds. Let your imagination soar as you create, collaborate, and share magical stories with the world! <br />
                &nbsp;
                
              </p>
            </Col>
            
          </Row>
          
        </Container>
      </Container>
      <Container fluid id="pricing" className="block pricing-block">
        <div className="title-holder">
          <h2>Pricing &amp; plans</h2>
          <div className="subtitle">check our pricing &amp; plans</div>
        </div>
        <Row>
          {
            pricingData.map(pricing => {
              return (
                <Col sm={4} key={pricing.id}>
                  <div className='heading'>
                    <h3>{pricing.plan}</h3>
                    <span className='price'>{pricing.price}</span>
                  </div>
                  <div className='content'>
                    <ListGroup>
                      {
                        pricing.features.map((feature, index) => {
                          return (
                            <ListGroup.Item key={index}>{feature}</ListGroup.Item>    
                          );
                        })
                      }
                    </ListGroup>
                  </div>
                  <div className='btn-holder'>
                    <a href={pricing.link} className='btn btn-danger'>Order Now</a>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </section>
    
  );
}

export default Home;
