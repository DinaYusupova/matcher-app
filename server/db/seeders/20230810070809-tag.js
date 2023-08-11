/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'user1@example.com',
          password: 'password123',
        },
        {
          email: 'user2@example.com',
          password: 'securepass456',
        },
        {
          email: 'user3@example.com',
          password: '12345qwerty',
        },
        {
          email: 'user4@example.com',
          password: '12345qwerty',
        },
        {
          email: 'user5@example.com',
          password: '12345qwerty',
        },
        {
          email: 'user6@example.com',
          password: '12345qwerty',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Profiles',
      [
        {
          name: 'Alice',
          age: 28,
          gender: 'Female',
          city: 'New York',
          userId: 1,
          description: 'I love hiking and photography.',
        },
        {
          name: 'Bob',
          age: 35,
          gender: 'Male',
          city: 'Los Angeles',
          userId: 2,
          description:
            'Musician and avid traveler. А еще ээээ люблю эээээ девушек и мужчин и да, ура, сегодня, есть что, куда?Пупупуппупупупупууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууууу',
        },
        {
          name: 'Eve',
          age: 22,
          gender: 'Female',
          city: 'Chicago',
          userId: 3,
          description: 'Aspiring artist and coffee enthusiast.',
        },
        {
          name: 'Alicy',
          age: 27,
          gender: 'Female',
          city: 'New York',
          userId: 4,
          description: 'I love hiking and photography.',
        },
        {
          name: 'Alica',
          age: 26,
          gender: 'Female',
          city: 'New York',
          userId: 5,
          description: 'I love hiking and photography.',
        },
        {
          name: 'Alici',
          age: 30,
          gender: 'Female',
          city: 'New York',
          userId: 6,
          description: 'I love hiking and photography.',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Chats',
      [
        {
          senderId: 1,
          recipientId: 2,
          message: "Hey Bob, how's it going?",
        },
        {
          senderId: 2,
          recipientId: 1,
          message: "Hey Alice, I'm doing great. Just got back from a gig!",
        },
        {
          senderId: 3,
          recipientId: 1,
          message: 'Hi Alice, I really like your artwork.',
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Likes',
      [
        {
          likedById: 1,
          likerId: 2,
        },
        {
          likedById: 2,
          likerId: 3,
        },
        {
          likedById: 3,
          likerId: 1,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Dislikes',
      [
        {
          dislikerId: 1,
          dislikedById: 2,
        },
        {
          dislikerId: 2,
          dislikedById: 3,
        },
        {
          dislikerId: 3,
          dislikedById: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {},
};
