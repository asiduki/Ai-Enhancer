const express = require('express');
const {Register_user , Login_user , Logout_User , get_user_data} = require("../Controller/Login");

const router = express.Router();

router.post('/register' , Register_user);
router.post('/login' , Login_user);
router.post('/logout' , Logout_User);
router.get('/getInfo' , get_user_data);

module.exports = router;