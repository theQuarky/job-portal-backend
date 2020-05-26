import IRequest from '../interface/IRequest';
import IResponse from '../interface/IResponse';
import { NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import CONFIG from '../config/config';
import Boom = require('boom');

export default function authentication(req:IRequest, res:IResponse, next:NextFunction) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      const decode = jwt.verify(bearerToken,CONFIG.JWT_ENCRYPTION);
      // will send invalid jwt automatically else continue code further
      req.data = decode;
      console.log(decode);
      return next();
  } else {
      // Forbidden
      const err = new Error("Please login");
      return res.send(Boom.boomify(err, { statusCode: 400 }));
  }
}

