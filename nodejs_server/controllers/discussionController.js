import Discussion from "../models/Discussion.js";
import { adminCheck } from "../middlewares/roleCheck.js";

const getDiscussions = async (req, res) => {
  try {
    const discussions =
      req.user.role === "admin"
        ? await Discussion.findAll()
        : await Discussion.findAll({
            where: {
              createdBy: req.user.id,
            },
          });
    return res.status(200).json(discussions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDiscussionById = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findByPk(id);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    if (req.user.role !== "admin" && discussion.createdBy !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return res.status(200).json(discussion);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createDiscussion = async (req, res) => {
  const admin = await adminCheck(req, res);
  if (!admin) {
    createPrivateDiscussion(req, res);
    return;
  }

  const { type, name, capacity, invitedUserId } = req.body;

  try {
    const discussion = await Discussion.create({
      type,
      name,
      capacity,
      createdBy: req.user.id,
    });

    const user = await User.findByPk(req.user.id);
    await user.addDiscussion(discussion);

    if (type === "private") {
      if (invitedUserId) {
        const invitedUser = await User.findByPk(invitedUserId);
        await invitedUser.addDiscussion(discussion);
      } else {
        return res
          .status(400)
          .send("Invited user is required for private discussions");
      }
    }
    return res.status(201).send(discussion);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).send("Discussion not found");
    }
    await discussion.update(req.body);
    res.json(discussion);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Discussion.update(req.body, {
      where: { id },
    });
    if (!updated) {
      return res.status(404).json({ error: "Discussion not found" });
    }
    const discussion = await Discussion.findByPk(id);
    if (req.user.role !== "admin" && discussion.createdBy !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return res.status(200).json(discussion);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/******************************** */
const createPrivateDiscussion = async (req, res) => {
  const { name, invitedUserId } = req.body;
  const createdBy = req.user.id;
  try {
    const discussion = await Discussion.create({
      type: "private",
      name,
      capacity: 2,
      createdBy,
    });
    await Participation.create({
      userId: createdBy,
      discussionId: discussion.id,
    });
    await Participation.create({
      userId: invitedUserId,
      discussionId: discussion.id,
    });
    return res.status(201).json({
      discussion,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
};
