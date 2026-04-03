const express = require('express');
const router = express.Router();
const passport = require('../Config/passport');
const jwt = require('jsonwebtoken');

const handleCallback = (req, res) => {
    const token = jwt.sign({ userid: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
    res.redirect(`${process.env.FRONTEND_URL}`);
};

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }), handleCallback);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login` }), handleCallback);

module.exports = router;