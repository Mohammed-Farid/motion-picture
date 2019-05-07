/* eslint-disable no-underscore-dangle */
const List = require('../../models/list');
// const User = require('../../models/user');

const getListJSON = async (cachedUser, searchedUser) => {
  let lists = [];

  try {
    // const { nickname } = req[source];
    // const user = await User.findOne({ nickname });
    lists = await List.find({ owner: searchedUser._id });

    if (lists.length === 0) {
      return [];
    }
    // console.log('searchedUser', searchedUser.name, lists);

    if (cachedUser._id.toString() !== searchedUser._id.toString()) {
      lists = lists.filter(list => list.public);
    }

    lists = lists.map(list => ({
      id: list.id,
      name: list.name,
      owner: searchedUser.nickname,
      public: list.public,
      description: list.description,
    }));
  } catch (error) {
    console.log(error.message);
  }

  return lists;
};

module.exports = {
  getListJSON,
};
