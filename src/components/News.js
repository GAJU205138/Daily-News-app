import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Snipper from "./Snipper";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Entry from "./Entry";
import Weather from "./Weather";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(0);
  const [totalResults, settotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)}-NewsMonkey`

  const capitalizeFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const upDateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    props.setProgress(50);
    setarticles(parsedata.articles);
    settotalResults(parsedata.totalResults);
    setloading(parsedata.loading);
    props.setProgress(100);
  };

  useEffect(
    () => {
      upDateNews();
    }, // eslint-disable-next-line
    []
  );

  // async componentDidMount() {
  //   // this.setState({ loading: true })
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&page=1&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedata = await data.json();
  //   // console.log(parsedata);
  //   // this.setState({
  //   //   articles: parsedata.articles,
  //   //   totalResults: parsedata.totalResults,
  //   //   loading: false
  //   // });
  //   this.upDateNews();
  // }

  // const handlePrevClick = async () => {
  //   // console.log('Prev');
  //   // this.setState({ loading: true })
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedata = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedata.articles,
  //   //   loading: false
  //   // });
  //   setpage(page -1)
  //   upDateNews();
  // }

  // const handleNextClick = async () => {
  //   // console.log('Next');
  //   // this.setState({ loading: true })
  //   // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
  //   // }
  //   // else {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //   let data = await fetch(url);
  //   //   let parsedata = await data.json();
  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles: parsedata.articles,
  //   //     loading: false
  //   //   })
  //   // }
  //   setpage(page +1)
  //   upDateNews();
  // }
  // setarticles([]);
  const fetchMoreData = async () => {
    setpage(page + 1);
    // setarticles([]);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=3529b99cf725414fb8d0d5cf282f2f0b&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    setarticles(articles.concat(parsedata.articles));
    settotalResults(parsedata.totalResults);
    setloading(parsedata.loading);
  };

  // useEffect(() => {
  //   fetchMoreData();
  // }, []);

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        News-Hub Top Headlines {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Snipper />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Snipper />}
      >
        <div className="container">
          <div className="row py-4">
            <div className="col-md-6">
              <Entry category={props.category} />
            </div>
            <div className="col-md-6">
              <Weather />
            </div>
          </div>
          <div className="row">
            {articles.map((element, i) => {
              if (i <= 4) {
                return null;
              }
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 15,
  category: "general",
};
News.propsType = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default React.memo(News);
