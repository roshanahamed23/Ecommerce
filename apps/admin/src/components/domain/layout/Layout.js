/* eslint-disable */
import React from 'react';
import Nav from '../navbar/Nav.js';

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Nav />
      <div className="flex flex-grow rounded-md padding">{children}</div>
    </div>
  );
};
