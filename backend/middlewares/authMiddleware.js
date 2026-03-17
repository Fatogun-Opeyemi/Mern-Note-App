import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // GET TOKEN FROM THE HEADER
      token = req.headers.authorization.split(' ')[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET THE USER FROM THE TOKEN
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log('JWT ERROR CAUGHT:', error.message);
      console.log(error);
      return res.status(401).json('Not authorized');
    }
  } else {
    console.log('NO TOKEN FOUND IN HEADER');
    res.status(401).json('Not authorized, no token');
  }
});
