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
  mnAssociation,
  superManyToMany,
  associationScope,
  postProduct,
  unMangeTransaction,
  mangeTransaction,
  hooks,
  polyOneToMany,
  polyManyToMany,
  queryInterface,
  subQuery
} = require("../controllers/userController");

router.post("/create", postUser);

router.post("/createProduct", postProduct);

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

router.get("/super-many-to-many", superManyToMany);

router.get("/association-scope", associationScope);

router.get("/un-manage-transaction", unMangeTransaction); // Un-Manage-Transaction

router.get("/manage-transaction", mangeTransaction); // Manage-Transaction

router.get("/hooks", hooks);

router.get("/polymorphic-one-to-many", polyOneToMany);

router.get("/polymorphic-many-to-many", polyManyToMany);

router.get("/query-interface", queryInterface);

router.get("/sub-query", subQuery);

router.patch("/users/:id", patchUser);

router.put("/users/:id", putUser);

router.delete("/users/:id", deleteUser);

module.exports = router;
