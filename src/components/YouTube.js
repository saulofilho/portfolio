import React from 'react';

const YouTube = () => {
  return (
    <div className="YouTube">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/bcCWTN91GAo?controls=0?autoplay=1"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default YouTube
