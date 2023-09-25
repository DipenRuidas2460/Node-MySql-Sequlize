const express = require("express");

const router = express.Router();

const {
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
  mnAssociation
} = require("../controllers/userController");

router.post("/create", postUser);

router.get("/addUser", addUser);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.get("/query", queryUser);

router.get("/finders", findUser);

router.get("/get-set-virtual", getSetVirtualUser);

router.get("/validateuser", validateUser);

router.get("/raw-query", rawQueryUser);

router.get("/one-to-one", oneToOne);

router.get("/one-to-many", oneToMany);

router.get("/many-to-many", manyToMany);

router.get("/paranoid", paranoidUser);

router.get("/egar-loading", egarLoading);

router.get("/lazy-loading", lazyLoading);

router.get("/advance-egar-loading", advanceEgarLoading);

router.get("/nested-egar-loading", nestedEgarLoading);

router.get("/creating-with-associations", createAssociation);

router.get("/m-n-associations", mnAssociation);

router.patch("/users/:id", patchUser);

router.put("/users/:id", putUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
