const knex = require("../db/knex");

const TABLE_NAME = "users";

async function findById(userId) {
  console.log("userId");
  console.log(userId);
  const user = await where({id: userId});
  if (user === null) {
    console.log("nullです");
    // throw new Error("User not found")
  }else{
    console.log(`user: ${user.name}`);
  }

  return {...user};
}

async function where(condition) {
  return await knex(TABLE_NAME)
    .where(condition)
    .then((results) => {
      if (results.length === 0) {
        return null;
      }
      console.log(`result${results[0]}`);
      return results[0];
    });
}

module.exports = {
  findById,
};