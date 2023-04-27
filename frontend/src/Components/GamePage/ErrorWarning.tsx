import React from 'react';
import { useState, useEffect } from 'react';
import '../../styling/ErrorWarning.scss';

const ErrorWarning = ({ wrongWord }: any) => {

  return (
    <div className="error-warning-container">
    <div className="error-text">{`${wrongWord} is not a valid word in scrabble. Please try again or pass your turn`}</div>
    </div>
  )
}

export default ErrorWarning;