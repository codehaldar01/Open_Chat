import express from 'express';

const router = express.Router();

router.route('/signup').get((req, res) => {
  res.send('Hello World, signup');
});

router.route('/signin').get((req, res) => {
  res.send('Hello World, signin ');
});

router.route('/signout').get((req,res)=>{
    res.send('Hello World, lets not signout now');
});

export default router;
