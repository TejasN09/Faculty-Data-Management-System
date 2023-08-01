const express = require('express');
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const serviceSid = process.env.SERVICEID;
const router = require("express").Router();

const client = require('twilio')(accountSid, authToken);

const sendotp = async (req, res) => {
    try {
      const verification = await client.verify.v2.services(serviceSid)
        .verifications
        .create({ to: `+${req?.body?.phone}`, channel: 'sms' });
  
      console.log(verification.status);
      //send a response back to the client indicating the success of sending the OTP.
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the verification process.
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  };
  

  const verifyotp = async (req, res) => {
    try {
      const verification_check = await client.verify.v2.services(serviceSid)
        .verificationChecks
        .create({ to: `+${req?.body?.phone}`, code: req?.body?.code });
  
      console.log(verification_check.status);
      if (verification_check.status === 'approved') {
        console.log("OTP verification successful");
        // can send a response back to the client indicating the successful verification.
        res.json({ verified: true });
      } else {
        console.log("Wrong OTP");
        // can send a response back to the client indicating that the OTP is incorrect.
        res.status(400).json({ error: 'Wrong OTP' });
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the verification process.
      //  send an error response back to the client./
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  };
  

module.exports = {
    sendotp,
    verifyotp
}
