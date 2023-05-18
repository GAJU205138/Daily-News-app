import React from "react";
import { Carousel } from "react-bootstrap";
import { useState, useEffect } from "react";

const Entry = (props) => {
  const [articles, setarticles] = useState([]);

  const upDateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    setarticles(parsedata.articles);
  };

  useEffect(() => {
    upDateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Carousel>
        {articles.map((element) => (
          <Carousel.Item key={element.url} className="carousel">
            <img
              className="testimonialImages d-block w-100 carousel"
              style={{ width: "500px", height: "300px" }}
              src={element.urlToImage ? element.urlToImage : "images/news.jpg"}
              alt={element.author}
            />
            <Carousel.Caption>
              <h4>{element.title}</h4>
              <p>{element.author}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};
Entry.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};

export default Entry;
