const db = require("../db/db");
const User = db.user;
const Product = db.product;
const Education = db.education;
const { Sequelize, Op, QueryTypes } = require("sequelize");

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
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await User.findAll({});
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.findOne({ where: { id: userId } });
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
    return res.status(500).send({ status: false, msg: err });
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
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const getSetVirtualUser = async (req, res) => {
  try {
    const data = await User.findAll({});

    // const data = await User.create({
    //   firstName: "Naresh",
    //   lastName: "Ghosh",
    // });

    return res
      .status(200)
      .json({ msg: "Record find Successfully!", data: data });
  } catch (error) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const validateUser = async (req, res) => {
  try {
    const data = await User.create({
      firstName: "naresh123",
      lastName: "Ghosh",
    });

    return res
      .status(200)
      .json({ msg: "Record find Successfully!", data: data });
  } catch (e) {
    let message,
      messages = {};
    e.errors.forEach((err) => {
      switch (err.validatorKey) {
        case "isAlpha":
          message = err.message;
          break;

        case "isLowercase":
          message = "Only Lowercase is allowed!";
          break;

        case "len":
          message = "Min 2 and Maximum 10 character are allowed!";
          break;
      }
      messages[err.path] = message;
    });
    return res.status(500).send({ status: false, msg: messages });
  }
};

const rawQueryUser = async (req, res) => {
  try {
    // const data = await db.sequelize.query("SELECT * from `users`", {
    //   type: QueryTypes.SELECT,
    //   model: User,
    //   mapToModel: true,
    // });

    // const data = await db.sequelize.query("SELECT 1 as `foo.bar.baz`", {
    //   nest: true,
    //   type: QueryTypes.SELECT,
    // });

    const data = await db.sequelize.query(
      // "SELECT * FROM users WHERE id = :id",
      "SELECT * FROM users WHERE id = $id",
      {
        // replacements: { id: "5" },
        bind: { id: "5" },
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      msg: "Record find Successfully!",
      // data: JSON.stringify(data[0], null, 2),
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const oneToOne = async (req, res) => {
  try {
    // const data = await User.create({ firstName: "shankar", lastName: "ruidas" });
    // if (data && data.id) {
    //   await Product.create({
    //     title: "electric",
    //     description: "fan",
    //     userId: data.id,
    //   });
    // }

    // const data = await User.findAll({
    //   attributes: ["firstName", "lastName"],
    //   include: {
    //     model: Product,
    //     as: "productDetails",
    //     attributes: ["title", "description"],
    //   },
    //   where: { id: "2" },
    // });

    const data = await Product.findAll({
      attributes: ["title", "description"],
      include: {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const oneToMany = async (req, res) => {
  try {
    // const data = await Product.create({
    //   title: "shop",
    //   description: "lifebouy",
    //   userId: "2",
    // });

    // const data = await User.findAll({
    //   attributes: ["firstName", "lastName"],
    //   include: {
    //     model: Product,
    //     as: "productDetails",
    //     attributes: ["title", "description"],
    //   },
    //   // where: { id: "2" },
    // });

    const data = await Product.findAll({
      attributes: ["title", "description"],
      include: {
        model: User,
        as: "userDetails",
        attributes: ["firstName", "lastName"],
      },
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const manyToMany = async (req, res) => {
  try {
    const data = await Product.create({
      title: "nirma",
      description: "surfexale",
      userId: "1",
    });

    // const data = await User.findAll({
    //   attributes: ["firstName", "lastName"],
    //   include: {
    //     model: Product,
    //     as: "productDetails",
    //     attributes: ["title", "description"],
    //   },
    //   // where: { id: "2" },
    // });

    // const data = await Product.findAll({
    //   attributes: ["title", "description"],
    //   include: {
    //     model: User,
    //     attributes: ["firstName", "lastName"],
    //   },
    // });

    // const data = await User.findAll({
    //   attributes: ["firstName", "lastName"],
    //   include: {
    //     model: Product,
    //     attributes: ["title", "description"],
    //   },
    // });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const paranoidUser = async (req, res) => {
  try {
    // const data = await Product.create({
    //   title: "india",
    //   description: "cricket",
    //   userId: "1",
    // });

    // const data = await Product.destroy({
    //   where: {
    //     id: 2,
    //   },
    //   // force: true,
    // });

    // const data = await Product.restore({
    //   where:{
    //     id:2
    //   }
    // })

    // const data = await Product.findAll({ paranoid: false });

    const data = await Product.findByPk(2, { paranoid: false });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const egarLoading = async (req, res) => {
  try {
    const data = await Product.findOne({
      where: {
        id: 2,
      },
      include: User,
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const lazyLoading = async (req, res) => {
  try {
    // const data = await User.create({
    //  firstName:"suresh", lastName:"Ruidas"
    // });

    // if (data && data.id) {
    //   await Product.create({title:"book", description:"suspence", userId:data.id})
    // }

    const data = await User.findOne({
      where: {
        id: 2,
      },
      // include:Product
    });

    const productData = await data.getProducts();

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
      productData: productData,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const advanceEgarLoading = async (req, res) => {
  try {
    const data = await User.findAll({
      // include: [{
      //   model: Product, // except required left join apply
      //   // required:true   // for inner join

      //   required: false, // right outer join
      //   right: true,     // right outer join
      // },{
      //   model:Education
      // }],
      include: { all: true }, // left outer join by default
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const nestedEgarLoading = async (req, res) => {
  try {
    const data = await User.findAll({
      // include: [{
      //   model: Product, // except required left join apply
      //   // required:true   // for inner join
      //   required: false, // right outer join
      //   right: true,     // right outer join
      // },{
      //   model:Education
      // }],
      // include: {
      //   model: Product,
      //   include: {
      //     model: Education,
      //     where: {
      //       id: 1,
      //     },
      //   },
      //   where: {
      //     id: 2,
      //   },
      // },
      // where: {
      //   id: 3,
      // },
      // include:{all:true, nested:true}
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const createAssociation = async (req, res) => {
  try {
    // await Product.bulkCreate(
    //   [
    //     {
    //       title: "film",
    //       description: "horror",
    //       users: {
    //         firstName: "ram",
    //         lastName: "Ghosh",
    //       },
    //     },
    //     {
    //       title: "play",
    //       description: "football",
    //       users: {
    //         firstName: "rahul",
    //         lastName: "Ghosh",
    //       },
    //     },
    //   ],
    //   {
    //     include: [db.productuser],
    //   }
    // );

    await Product.create(
      {
        title: "lence",
        description: "glass",
        users: {
          firstName: "ajoy",
          lastName: "das",
        },
      },

      {
        include: [db.productuser],
      }
    );

    const data = await User.findAll({
      include: {
        model: Product,
      },
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
  }
};

const mnAssociation = async (req, res) => {
  try {
    // const amidala = await db.customer.create({ username: "p4dm3", points: 1000 });
    // const queen = await db.profile.create({ name: "Queen" });
    // await amidala.addProfile(queen, { through: { selfGranted: false } });
    // const result = await db.customer.findOne({
    //   where: { username: "p4dm3" },
    //   include: db.profile,
    // });

    const amidala = await db.customer.create(
      {
        username: "p4dm3",
        points: 1000,
        profiles: [
          {
            name: "Queen",
            User_Profile: {
              selfGranted: false,
            },
          },
        ],
      },
      {
        include: db.profile,
      }
    );

    const result = await db.customer.findOne({
      where: { username: "p4dm3" },
      include: db.profile,
    });

    return res.status(200).json({
      msg: "Record created Successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: false, msg: err });
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
  validateUser,
  rawQueryUser,
  oneToOne,
  oneToMany,
  manyToMany,
  paranoidUser,
  egarLoading,
  lazyLoading,
  advanceEgarLoading,
  nestedEgarLoading,
  createAssociation,
  mnAssociation,
};
