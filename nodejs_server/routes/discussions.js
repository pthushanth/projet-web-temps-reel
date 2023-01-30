import { Router } from "express";
import {
  createDiscussion,
  deleteDiscussion,
  getDiscussionById,
  getDiscussions,
  updateDiscussion,
} from "../controllers/discussionController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, getDiscussions);
router.get("/:id", auth, getDiscussionById);
router.post("/", auth, createDiscussion);
router.put("/:id", auth, updateDiscussion);
router.delete("/:id", auth, deleteDiscussion);

export default router;
