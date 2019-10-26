/* eslint-disable no-undef,no-unused-vars */
const express = require( "express" );
const router = express.Router( {} );

/* GET home page. */
router.get( "/", function ( req, res, next ) {
  res.send("App running...");
} );

module.exports = router;
