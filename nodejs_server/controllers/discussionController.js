import Discussion from "../models/Discussion.js";
import { adminCheck } from "../middlewares/roleCheck.js";
import User from "../models/User.js";

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
  if (req.user.role !== "admin") {
    return createPrivateDiscussion(req, res);
  }
  if (res.headersSent) {
    return;
  }

  const { type, name, capacity } = req.body;

  try {
    const discussion = await Discussion.create({
      type,
      name,
      capacity,
      createdBy: req.user.id,
    });

    const user = await User.findByPk(req.user.id);
    console.log("----------------------------------");
    console.log(await User.findByPk(req.user.id));
    console.log(user);
    console.log("----------------------------------");
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
    await discussion.update({
      name: req.body.name,
      capacity: req.body.capacity,
    });
    res.json(discussion);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findByPk(id);
    await discussion.destroy();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/******************************** */
const createPrivateDiscussion = async (req, res) => {
  const { name, inviteeId } = req.body;
  const createdBy = req.user.id;
  try {
    const discussion = await Discussion.create({
      type: "private",
      name,
      capacity: 2,
      createdBy,
    });

    const user = await User.findByPk(createdBy);
    const invitedUser = await User.findByPk(inviteeId);

    console.log("user", user);
    console.log("invitedUser", invitedUser);

    await User.findByPk(createdBy).then((user) => {
      user.addDiscussion(discussion);
    });
    await User.findByPk(inviteeId).then((user) => {
      user.addDiscussion(discussion);
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

const getAllMessagesByDiscussionId = async (req, res) => {
  try {
    const user = req.user;
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).send("Discussion not found");
    }

    if (user.role !== "admin" && !(await user.hasDiscussion(discussion))) {
      return res.status(403).send("Access denied");
    }

    const messages = await discussion.getMessages({
      include: [{ model: User, as: "sender" }],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
};

const checkDiscussion = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const inviteeId = req.params.id;
    const discussion = await Discussion.findOne({
      where: {
        [Op.or]: [
          {
            userId: currentUserId,
            inviteeId: inviteeId,
          },
          {
            userId: inviteeId,
            inviteeId: currentUserId,
          },
        ],
      },
    });
    if (!discussion) {
      return res.status(404).send("Discussion not found");
    }
    return res.status(200).json(discussion);
  } catch (err) {
    res.status(500).send(err);
  }
};

export {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getAllMessagesByDiscussionId,
  checkDiscussion,
};
