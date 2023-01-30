const adminCheck = async (req, res, next) => {
  try {
    // const user = await User.findByPk(req.user.id);
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    return true;
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const userCheck = async (req, res, next) => {
  try {
    // const user = await User.findByPk(req.user.id);
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (user.role !== "user") {
      return res.status(403).json({ error: "Forbidden" });
    }
    return true;
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { adminCheck, userCheck };
