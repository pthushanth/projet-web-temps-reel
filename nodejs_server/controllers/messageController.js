import Message from "../models/Message.js";

const createMessage = async (req, res) => {
  const messageText = req.body.message;
  const discussionId = req.params.id;

  try {
    const message = await Message.create({
      messageText,
      senderId: req.user.id,
      discussionId,
    });
    return res.status(201).json({
      message,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export { createMessage };
