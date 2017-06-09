import * as express from "express";
import * as passport from "passport";
import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
import * as contactController from "../controllers/contact";
const router = express.Router();
import * as passportConfig from "../config/passport";
import * as apiController from "../controllers/api";
import * as productController from "../controllers/product";
/**
 * Login routes.
 */
router.get("/", homeController.index);
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/logout", userController.logout);
router.get("/forgot", userController.getForgot);
router.post("/forgot", userController.postForgot);
router.get("/reset/:token", userController.getReset);
router.post("/reset/:token", userController.postReset);

router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);
router.get("/contact", contactController.getContact);
router.post("/contact", contactController.postContact);

router.get("/account", passportConfig.isAuthenticated, userController.getAccount);
router.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
router.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

router.get("/api", apiController.getApi);
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
    res.redirect(req.session.returnTo || "/");
});
/**
 * for Route 
 */
router.get("/admin/product", passportConfig.isAuthenticated, productController.newFormItem);
router.post("/admin/product", passportConfig.isAuthenticated, productController.addItem);
router.get("/admin/products/list", passportConfig.isAuthenticated, productController.ListItems);
export { router };