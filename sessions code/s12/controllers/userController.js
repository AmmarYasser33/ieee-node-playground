exports.getAllUsers = (req, res) => {
  res.json({
    message: "success",
    data: "All users",
  });
};

exports.getUser = (req, res) => {
  res.json({
    message: "success",
    data: "User",
  });
};

exports.createUser = (req, res) => {
  res.json({
    message: "success",
    data: "User created",
  });
};

exports.deleteUser = (req, res) => {
  res.json({
    message: "success",
    data: "User deleted",
  });
};

exports.updateUser = (req, res) => {
  res.json({
    message: "success",
    data: "User updated",
  });
};
