const TokenGenerator = require('../models/token_generator');
const User = require('../models/user');

const FriendsController = {
  // Form friend connection
  AddFriend: async (req, res) => {
    let user = await User.findById(req.user_id)
    let friendName = req.body.friend.split(' ')

    let potentialFriend = await User.findOne({firstName: friendName[0], lastName: friendName[1]});
    console.log(potentialFriend);

    const token = await TokenGenerator.jsonwebtoken(req.user_id);

    if (!potentialFriend || user.friends.includes(potentialFriend._id)) {
      res.status(201).json({ message: 'Friend not found', token: token });
    }
    
    else {
      user.friends.push(potentialFriend._id);
      user.save();
      res.status(201).json({ message: 'OK', token: token });
    }
  }
}

module.exports = FriendsController;

// TODO: Add an index method that returns a users friendslist.