const prisma = require("../db");
const { sendSuccess, sendError } = require("../utils/responseHelper");

const getUser = async (req, res) => {
  const users = await prisma.user.findMany();
  sendSuccess(res, "Success get user", users);
};

const detailUser = async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: +id }
  });

  if (!user)
    return sendError(
      res,
      404,
      "User not found",
      `User with id ${id} is not found`
    );

  sendSuccess(res, "Success get detail user", user);
};

const createUser = async (req, res) => {
  const data = req.body;

  const user = await prisma.user.create({ data });

  sendSuccess(res, "Success create user", user);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const user = await prisma.user.update({
    where: { id: +id },
    data
  });

  sendSuccess(res, "Success update user", user);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.delete({
    where: {
      id: +id
    }
  });

  sendSuccess(res, "Success delete user", user);
};

module.exports = {
  getUser,
  detailUser,
  createUser,
  updateUser,
  deleteUser
};
