import React from 'react';
import { useHistory, useParams } from 'react-router-dom';


const Book = () => {
  const {name} = useParams();
  let history = useHistory();
  const handleBooking = () => {
    history.push("/hotel")
  }
  return (
    <div>
      <h2> {name} </h2>
      <button onClick={handleBooking} > Start Booking Hotel </button>
    </div>
  );
};

export default Book;