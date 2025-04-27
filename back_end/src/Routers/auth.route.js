import express from 'express';
import { signin, signout, signup, profUpdate, checkUser } from '../Controllers/auth.controller.js';
import protectRoute from '../Middleware/auth.middleware.js';

const router = express.Router();

router.route('/signup').post(signup);

router.route('/signin').post(signin);

router.route('/signout').post(signout);

router.route('/profile-update').put(protectRoute,profUpdate);

router.route('/check').get(protectRoute,checkUser);

export default router;
