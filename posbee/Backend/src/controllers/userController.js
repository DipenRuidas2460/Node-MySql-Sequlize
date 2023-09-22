const db = require("../db/db");
const User = db.user;
const { Sequelize, Op } = require("sequelize");

const addUser = async (req, res) => {
  try {
    // const jane = User.build({ firstName: "Deep", lastName: "Bhuniya" });
    const jane = await User.create({ firstName: "Rabi", lastName: "Shankar" });
    // console.log(jane instanceof User); // true
    // console.log(jane.firstName); // "Jane"
    // jane.set({ firstName: "Dipen", lastName: "Ruidas" });
    // await jane.update({ firstName: "Abhimunya"})
    jane.firstName = "Prasun";
    await jane.reload();
    // console.log(jane.firstName);
    // await jane.save();
    // await jane.destroy();
    // console.log("Jane was saved to the database!");
    // console.log(jane.toJSON());
    return res.status(200).json(jane.toJSON());
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await User.findAll({});
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.findOne({ where: { id: userId } });
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const postUser = async (req, res) => {
  try {
    const postData = req.body;
    let data;
    if (Array.isArray(postData) && postData.length > 0) {
      data = await User.bulkCreate(postData);
    } else {
      data = await User.create(postData);
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.destroy({ where: { id: userId } });
    return res
      .status(200)
      .json({ msg: "Record Deleted Successfully!", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const patchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.update(req.body, { where: { id: userId } });
    return res
      .status(200)
      .json({ msg: "Record Partially Updated!", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const putUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.update(req.body, { where: { id: userId } });
    return res
      .status(200)
      .json({ msg: "Record Updated Successfully!", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const queryUser = async (req, res) => {
  try {
    // const data = await User.create(
    //   {
    //     firstName: "Asish",
    //     lastName: "Ingle",
    //   },
    //   { fields: ["firstName"] }
    // );

    // const data = await User.findAll({
    //   attributes: [
    //     "id",
    //     ["firstName", "first_name"],
    //     [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
    //     [Sequelize.literal("COUNT(`firstName`)"), "count"],
    //     [Sequelize.fn("SUM", Sequelize.col("firstName")), "total"],
    //   ],
    //   group: ["id"],

    //   attributes: {
    //     exclude: ["firstName"],
    //     include: ["id", [Sequelize.fn("COUNT", Sequelize.col("id")), "count"]],
    //   },
    //   group: ["id"],

    //   where: {
    //     id: {
    //       [Op.eq]: 3,
    //     },
    //   },

    //   order: [["id", "DESC"]],
    //   group: ["id"],
    //   limit: 1,
    //   offset: 1,
    // });

    const data = await User.count({
      where: {
        id: {
          [Op.gt]: 3,
        },
      },
    });

    return res.status(200).json({ msg: "Data Added!", data: data });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, data: err });
  }
};

const findUser = async (req, res) => {
  try {
    // const [user, created] = await User.findOrCreate({
    //   where: { firstName: "Ganesh" },
    //   defaults: {
    //     lastName: "Ghosh",
    //   },
    // });

    const { count, rows } = await User.findAndCountAll({
      where: { lastName: "Singh" },
    });

    return res
      .status(200)
      .json({ msg: "Record find Successfully!", data: rows, count: count });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

const getSetVirtualUser = async (req, res) => {
  try {
    const data = await User.findAll({});

    return res
      .status(200)
      .json({ msg: "Record find Successfully!", data: data });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.msg });
  }
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  postUser,
  deleteUser,
  patchUser,
  putUser,
  queryUser,
  findUser,
  getSetVirtualUser,
};
