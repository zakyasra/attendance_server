const moment = require("moment");
const { sendSuccess, sendError } = require("../utils/responseHelper");
const prisma = require("../db/index");

const getAttendance = async (req, res) => {
  const attendance = await prisma.attendance.findMany({
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

  sendSuccess(res, "Success get attendace", attendance);
};

const getCurrentAttendance = async (req, res) => {
  const { work_date, user_id } = req.query;

  if (!work_date) {
    sendError(res, 400, "Incomplete request data", "work_date is missing");
    return;
  }
  if (!user_id) {
    sendError(res, 400, "Incomplete request data", "user_id is missing");
    return;
  }

  const attendance = await prisma.attendance.findFirst({
    where: {
      work_date: { equals: new Date(work_date) },
      user_id: +user_id
    }
  });

  if (attendance) {
    sendSuccess(res, "Success get current attendance", attendance);
  } else {
    sendSuccess(res, "User does not have current attendance");
  }
};

const createAttendance = async (req, res) => {
  const data = req.body;

  const attendance = await prisma.attendance.create({
    data: {
      ...data,
      work_date: moment.utc(data.work_date),
      check_in: moment.utc(data.check_in)
    }
  });

  sendSuccess(res, "Success create attendance", attendance);
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

  sendSuccess(res, "Success update attendance", attendance);
};

const deleteAttendance = async (req, res) => {
  const id = req.params.id;

  const attendance = await prisma.attendance.delete({
    where: {
      id: +id
    }
  });

  sendSuccess(res, "Success delete attendance", attendance);
};

module.exports = {
  getAttendance,
  getCurrentAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance
};
