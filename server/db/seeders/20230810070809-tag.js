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
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Anketas',
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
          description: 'Musician and avid traveler.',
        },
        {
          name: 'Eve',
          age: 22,
          gender: 'Female',
          city: 'Chicago',
          userId: 3,
          description: 'Aspiring artist and coffee enthusiast.',
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
  },

  async down(queryInterface, Sequelize) {},
};
