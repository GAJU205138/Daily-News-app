import React from "react";

const NewsItem = (props) => {
  let { title, imageUrl, newsUrl, date, source } = props;

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    // console.log(seconds);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + "y ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + "d ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m ago";
    }
    return Math.floor(seconds) + "sec ago";
  }
  return (
    <div className="py-3">
      <div className="card">
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            right: 0,
          }}
        >
          <span
            className="badge rounded-pill bg-danger"
            style={{ left: "90%" }}
          >
            {source}
          </span>
        </div> */}

        <img
          src={imageUrl ? imageUrl : "images/news.jpg"}
          className="card-img-top"
          alt="..."
          style={{ height: "150px" }}
        />
        <a
          href={newsUrl}
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            className="card-body"
            style={{ height: "150px", overflow: "hidden" }}
          >
            <div className="card-title">
              <h6>{title}</h6>
            </div>
            {/* <p className="card-text">{description}</p> */}
            <p className="card-text">
              <small className="text-muted">
                {source ? source : "Unknown"} : {timeSince(new Date(date))}
              </small>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
