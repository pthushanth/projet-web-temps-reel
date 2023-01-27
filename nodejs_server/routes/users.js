import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";

import { upload } from "../utils/uploadFile.js";

const router = Router();

router.get("/allusers", auth, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/test/:id", auth, upload.single("profile_pic"), updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
