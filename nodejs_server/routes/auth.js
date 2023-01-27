import { register, login } from "../controllers/authController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
