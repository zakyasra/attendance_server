const { PrismaClient } = require("@prisma/client");
const moment = require("moment");
const prisma = new PrismaClient();

const getAttendance = async (req, res) => {
  const { work_date, user_id } = req.query;

  //   Search by user_id dan work_date hari ini
  const where = {};
  if (work_date) where.work_date = { equals: new Date(work_date) };
  if (user_id) where.user_id = +user_id;

  const attendance = await prisma.attendance.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  res.status(200).send({
    message: "Success get attendance",
    data: attendance
  });
};

const createAttendance = async (req, res) => {
  const data = req.body;

  const attendance = await prisma.attendance.create({
    data: {
      ...data,
      work_date: new Date(data.work_date),
      check_in: moment.utc(data.check_in)
    }
  });

  res.status(201).send({
    message: "Success create attendance",
    data: attendance
  });
};

const updateAttendance = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const attendance = await prisma.attendance.update({
    where: { id: +id },
    data: {
      ...body,
      check_out: moment.utc(body.check_out)
    }
  });

  res.status(201).send({
    message: "Success update attendance",
    data: attendance
  });
};

const deleteAttendance = async (req, res) => {
  const id = req.params.id;

  const attendance = await prisma.attendance.delete({
    where: {
      id: +id
    }
  });

  res.status(201).send({
    message: "Success delete attendance",
    data: attendance
  });
};

module.exports = {
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance
};
