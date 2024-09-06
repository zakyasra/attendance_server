const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUser = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send({
    message: "Success get user",
    data: users
  });
};

const detailUser = async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.findUnique({
    where: { id: +id }
  });

  if (!user)
    return res.status(404).send({
      message: "User not found",
      data: user
    });

  res.status(200).send({
    message: "Success get detail User",
    data: user
  });
};

const createUser = async (req, res) => {
  const data = req.body;

  const user = await prisma.user.create({ data });

  res.status(201).send({
    message: "Success create user",
    data: user
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const user = await prisma.user.update({
    where: { id: +id },
    data
  });

  res.status(201).send({
    message: "Success update user",
    data: user
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await prisma.user.delete({
    where: {
      id: +id
    }
  });

  res.status(201).send({
    message: "Success delete user",
    data: user
  });
};

module.exports = {
  getUser,
  detailUser,
  createUser,
  updateUser,
  deleteUser
};
