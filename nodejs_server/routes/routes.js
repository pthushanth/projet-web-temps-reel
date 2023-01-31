const DiscussionController = require("../controllers/discussionController");
const NotificationController = require("../controllers/NotificationController");
const RequestController = require("../controllers/RequestController");

import { Router } from "express";
import auth from "../middlewares/auth.js";
import { adminCheck } from "../middlewares/roleCheck";
const router = Router();

// Notification routes
router.get("/notifications", auth, NotificationController.index);
router.get("/notifications/:id", auth, NotificationController.show);
router.post("/notifications", auth, adminCheck, NotificationController.store);
router.put(
  "/notifications/:id",
  auth,
  adminCheck,
  NotificationController.update
);
router.delete(
  "/notifications/:id",
  auth,
  adminCheck,
  NotificationController.delete
);

// Request routes
router.get("/requests", auth, RequestController.index);
router.get("/requests/:id", auth, RequestController.show);
router.post("/requests", auth, RequestController.store);
router.put("/requests/:id", auth, RequestController.update);
router.delete("/requests/:id", auth, RequestController.delete);

module.exports = router;
