const { User, Profile } = require('./db/models');

const profile = User.findAll({
  where: {
    '$Users->Likes.userId$': null,
    include: {
      models: Profile,
    },
  },
});
console.log(profile);

// Questions.findAll({
//     where: {
//     '$Users->UsersAnswers.user_id$': null,
//     },
//     include: {
//     model: Users,
//     where: {id:1},
//     required: false
//     },
//    })
//    .then(res => console.log(toJson(res)));
