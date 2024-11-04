import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const images = [
  { src: 'https://images.unsplash.com/photo-1540474211005-7c8a448f69e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 1' },
  { src: 'https://images.unsplash.com/photo-1637578371283-d9076f66ba8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
  { src: 'https://images.unsplash.com/photo-1668260920944-ec171ceb8633?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' },
  { src: 'https://images.unsplash.com/photo-1674834726923-3ba828d37846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4OTI2MjB8fGVufDB8fHx8fA%3D%3D', alt: 'Image 4' },
  { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 5' },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCardClick = (route) => {
    const isLoggedIn = true; // Replace with actual login check
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert('Please log in to access this feature.');
    }
  };

  return (
    <div>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="slide"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          >
            <img src={image.src} alt={image.alt} style={{ width: '100%', height: '400px' }} />
          </div>
        ))}
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          We are dedicated to promoting athletic excellence through comprehensive training programs,
          coaching, and support for athletes of all levels. Our mission is to inspire and empower
          athletes to achieve their highest potential.
        </p>
      </div>

      <h2 className="features-heading">Explore Features</h2> {/* Added heading here */}

      <div className="cards-container">
        <div className="card" onClick={() => handleCardClick('/event')}>
          <img src="https://starjournalnow.com/wp-content/uploads/2018/07/EVENTS-GRAPHIC_web.jpg" alt="Events" />
          <h3>Events</h3>
          <p>Explore upcoming events.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/athelete')}>
          <img src="https://thumbs.dreamstime.com/z/athletics-young-man-player-vector-sportsman-win-concept-various-race-competition-hurdle-long-jump-flat-athlete-cartoon-119326401.jpg" alt="Athletes" />
          <h3>Athletes</h3>
          <p>Learn about our athletes.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/coaches')}>
          <img src="https://img.freepik.com/premium-vector/cartoon-coach-training-teaching-kids-playing-football_179970-4791.jpg?w=2000" alt="Coaches" />
          <h3>Coaches</h3>
          <p>Meet our coaches.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/news')}>
          <img src="https://w7.pngwing.com/pngs/906/671/png-transparent-newspaper-editorial-cartoon-headline-comics-white-cartoon.png" alt="News" />
          <h3>News</h3>
          <p>Stay updated with the latest news.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/result')}>
          <img src="https://tse4.mm.bing.net/th?id=OIP.nt7B228gNJSlDe5HrPW8YgHaEK&pid=Api&P=0&h=180" alt="Results" />
          <h3>Results</h3>
          <p>Check the latest results.</p>
        </div>
        <div className="card" onClick={() => handleCardClick('/feedback')}>
          <img src="https://impulso06.com/wp-content/uploads/2023/02/Que-es-la-cultura-de-feedback-y-como-construirla.png" alt="Feedback" />
          <h3>Feedback</h3>
          <p>Give us your feedback.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
