import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

/**
 * Login routes.
 */
//app.get("/login", userController.getLogin);
router.get('/', (req, res) => {
    res.render("home", {
    title: "Home"
  });
});

export { router }