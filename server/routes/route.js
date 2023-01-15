const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const router = new express.Router();
const userController = require('../controller/user-controller');
const upload = require('../middleware/upload');

const jsonParser = bodyParser.json();

router.post('/users/signup', jsonParser, userController.signupUser);
router.post('/login', jsonParser, userController.loginUser);
router.post('/logout', jsonParser, auth,userController.logoutUser);
router.post('/updateProfileImage', upload.single("file"),auth, userController.updateProfileImage);
router.get('/getAllEditors', auth,userController.getAllEditors);
router.post('/verifyToken', auth,userController.verifyToken);
router.post('/updateUserDetails', jsonParser, auth,userController.updateUserDetails);

module.exports = router;