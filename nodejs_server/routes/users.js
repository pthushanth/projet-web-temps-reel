import {
  deleteUser,
  getUsers,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { Router } from "express";
import auth from "../middlewares/auth.js";

import { upload } from "../utils/uploadFile.js";

const router = Router();

// router.get("/allusers", auth, getAllUsers);
// router.get("/:id", auth, getUserById);
// router.put("/test/:id", auth, upload.single("profile_pic"), updateUser);
// router.delete("/:id", auth, deleteUser);

router.get("/allusers", auth, getUsers);
router.get("/:id", getUserById);
// router.put("/test/:id", upload.single("profile_pic"), updateUser);
router.delete("/:id", deleteUser);

export default router;
