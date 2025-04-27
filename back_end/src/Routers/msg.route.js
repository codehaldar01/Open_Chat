import express from 'express'
import protectRoute from '../Middleware/auth.middleware.js';
import {getUsersBar,getMessages,sendMessages} from "../Controllers/msg.controller.js";

const router=express.Router();

router.route('/users').get(protectRoute, getUsersBar);
router.route('/:id').get(protectRoute,getMessages);
//:id is variable taken from frontend part
router.route('send/:id').post(protectRoute,sendMessages);
export default router;