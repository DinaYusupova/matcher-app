const { UserAuth } = require('./test db/db/models');

UserAuth.findAll({
 where: {
    '$UserAuth->Likes'
 }
})

Questions.findAll({
    where: {
    '$Users->UsersAnswers.user_id$': null,
    },
    include : {
    model: Users,
    where: {id:1},
    required: false
    },
   })
   .then(res => console.log(toJson(res)));
