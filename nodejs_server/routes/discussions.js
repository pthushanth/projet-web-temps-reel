import { Router } from "express";
import {
  createDiscussion,
  deleteDiscussion,
  getAllMessagesByDiscussionId,
  getDiscussionById,
  getDiscussions,
  updateDiscussion,
  checkDiscussion,
} from "../controllers/discussionController.js";
import { createMessage } from "../controllers/messageController.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, getDiscussions);
router.get("/:id", auth, getDiscussionById);
router.post("/", auth, createDiscussion);
router.put("/:id", auth, updateDiscussion);
router.patch("/:id", auth, updateDiscussion);
router.delete("/:id", auth, deleteDiscussion);

router.get("/:id/messages", auth, getAllMessagesByDiscussionId);
router.get("/user/:id", auth, checkDiscussion);

router.post("/:id/messages", auth, createMessage);

export default router;
