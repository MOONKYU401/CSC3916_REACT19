import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'; // Import useParams

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); // Get movieId from URL parameters
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); // Assuming you have a loading state in your reducer
  const error = useSelector(state => state.movie.error); // Assuming you have an error state in your reducer


  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Card className="bg-dark text-dark p-4 rounded">
        <Card.Header>Movie Detail</Card.Header>
        <Card.Body>
          <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        </Card.Body>
        <ListGroup>
          <ListGroupItem>{selectedMovie.title}</ListGroupItem>
          <ListGroupItem>
            {selectedMovie.actors.map((actor, i) => (
              <p key={i}>
                <b>{actor.actorName}</b> {actor.characterName}
              </p>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <h4>
              <BsStarFill /> {selectedMovie.avgRating}
            </h4>
          </ListGroupItem>
        </ListGroup>
        <Card.Body>
  <h5>User Reviews</h5>
  {selectedMovie.movieReviews?.length > 0 ? (
    <div className="review-grid">
      <Row className="fw-bold mb-2">
        <Col xs={4}>Username</Col>
        <Col xs={2}>Rating</Col>
        <Col xs={6}>Review</Col>
      </Row>
      {selectedMovie.movieReviews.map((review, i) => (
        <Row key={i} className="mb-2">
          <Col xs={4}>{review.username}</Col>
          <Col xs={2}><BsStarFill /> {review.rating}</Col>
          <Col xs={6}>{review.review}</Col>
        </Row>
      ))}
    </div>
  ) : (
    <p>No reviews yet.</p>
  )}
</Card.Body>
      </Card>
    );
  };

  return <DetailInfo />;
};


export default MovieDetail;