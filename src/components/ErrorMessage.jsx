import React from 'react';

const ErrorMessage = ({ text }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'40px',flexDirection:'column'}}>
    
      <h2>Sorry,  <span width="40px" height="40px">😰</span></h2>
      
      <p>your response was invalid with error: <strong>{text}</strong></p>
    </div>
  );
};

export { ErrorMessage };
