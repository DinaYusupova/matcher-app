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
        {
          email: 'user7@example.com',
          password: 'securepass789',
        },
        {
          email: 'user8@example.com',
          password: 'strongpass2023',
        },
        {
          email: 'user9@example.com',
          password: 'mypassword456',
        },
        {
          email: 'user10@example.com',
          password: 'newpass123',
        },
        {
          email: 'user11@example.com',
          password: 'randompass987',
        },
        {
          email: 'user12@example.com',
          password: 'complexpass555',
        },
        {
          email: 'user13@example.com',
          password: 'mypassword789',
        },
        {
          email: 'user14@example.com',
          password: 'newpass789',
        },
        {
          email: 'user15@example.com',
          password: 'randompass555',
        },
        {
          email: 'user16@example.com',
          password: 'complexpass123',
        },
        {
          email: 'user17@example.com',
          password: 'securepass555',
        },
        {
          email: 'user18@example.com',
          password: 'strongpass789',
        },
        {
          email: 'user19@example.com',
          password: 'mypassword2023',
        },
        {
          email: 'user20@example.com',
          password: 'newpass456',
        },
        {
          email: 'user21@example.com',
          password: 'randompass123',
        },
        {
          email: 'user22@example.com',
          password: 'complexpass789',
        },
        {
          email: 'user23@example.com',
          password: 'mypassword555',
        },
        {
          email: 'user24@example.com',
          password: 'newpass789',
        },
        {
          email: 'user25@example.com',
          password: 'randompass2023',
        },
        {
          email: 'user26@example.com',
          password: 'complexpass456',
        },
        {
          email: 'user27@example.com',
          password: 'securepass123',
        },
        {
          email: 'user28@example.com',
          password: 'strongpass555',
        },
        {
          email: 'user29@example.com',
          password: 'mypassword789',
        },
        {
          email: 'user30@example.com',
          password: 'newpass2023',
        },
        {
          email: 'user31@example.com',
          password: 'randompass456',
        },
        {
          email: 'user32@example.com',
          password: 'complexpass789',
        },
        {
          email: 'user33@example.com',
          password: 'mypassword123',
        },
        {
          email: 'user34@example.com',
          password: 'newpass555',
        },
        {
          email: 'user35@example.com',
          password: 'randompass789',
        },
        {
          email: 'user36@example.com',
          password: 'complexpass2023',
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
        {
          name: 'Charlie',
          age: 31,
          gender: 'Male',
          city: 'San Francisco',
          userId: 7,
          description: 'Tech enthusiast and aspiring entrepreneur.',
        },
        {
          name: 'David',
          age: 29,
          gender: 'Male',
          city: 'Seattle',
          userId: 8,
          description: 'Software developer and avid gamer.',
        },
        {
          name: 'Grace',
          age: 24,
          gender: 'Female',
          city: 'Boston',
          userId: 9,
          description: 'Book lover and nature enthusiast.',
        },
        {
          name: 'Frank',
          age: 42,
          gender: 'Male',
          city: 'Miami',
          userId: 10,
          description: 'Fitness coach and health advocate.',
        },
        {
          name: 'Hannah',
          age: 28,
          gender: 'Female',
          city: 'Austin',
          userId: 11,
          description: 'Yoga instructor and animal lover.',
        },
        {
          name: 'Isaac',
          age: 37,
          gender: 'Male',
          city: 'Denver',
          userId: 12,
          description: 'Architect with a passion for sustainable design.',
        },
        {
          name: 'Julia',
          age: 33,
          gender: 'Female',
          city: 'San Diego',
          userId: 13,
          description: 'Foodie and travel enthusiast.',
        },
        {
          name: 'Katherine',
          age: 26,
          gender: 'Female',
          city: 'Portland',
          userId: 14,
          description: 'Artist and nature lover.',
        },
        {
          name: 'Liam',
          age: 23,
          gender: 'Male',
          city: 'Chicago',
          userId: 15,
          description: 'Film student and aspiring director.',
        },
        {
          name: 'Mia',
          age: 31,
          gender: 'Female',
          city: 'New York',
          userId: 16,
          description: 'Fashion designer and adventure seeker.',
        },
        {
          name: 'Nathan',
          age: 29,
          gender: 'Male',
          city: 'Los Angeles',
          userId: 17,
          description: 'Music producer and beach lover.',
        },
        {
          name: 'Olivia',
          age: 27,
          gender: 'Female',
          city: 'San Francisco',
          userId: 18,
          description: 'Tech journalist and coffee addict.',
        },
        {
          name: 'Patrick',
          age: 35,
          gender: 'Male',
          city: 'Seattle',
          userId: 19,
          description: 'Outdoor enthusiast and rock climber.',
        },
        {
          name: 'Quinn',
          age: 22,
          gender: 'Non-binary',
          city: 'Portland',
          userId: 20,
          description: 'Social activist and community organizer.',
        },
        {
          name: 'Riley',
          age: 28,
          gender: 'Genderqueer',
          city: 'San Diego',
          userId: 21,
          description: 'Writer and advocate for LGBTQ+ rights.',
        },
        {
          name: 'Sam',
          age: 26,
          gender: 'Male',
          city: 'Austin',
          userId: 22,
          description: 'Software engineer and video game enthusiast.',
        },
        {
          name: 'Taylor',
          age: 30,
          gender: 'Female',
          city: 'Denver',
          userId: 23,
          description: 'Mountain climber and nature photographer.',
        },
        {
          name: 'Unicorn',
          age: 1000,
          gender: 'Mythical',
          city: 'Dreamland',
          userId: 24,
          description: 'Believer in magic and rainbows.',
        },
        {
          name: 'Victor',
          age: 32,
          gender: 'Male',
          city: 'Miami',
          userId: 25,
          description: 'Surfer and beach conservationist.',
        },
        {
          name: 'Wendy',
          age: 29,
          gender: 'Female',
          city: 'Los Angeles',
          userId: 26,
          description: 'Actress and lover of classic cinema.',
        },
        {
          name: 'Xander',
          age: 27,
          gender: 'Male',
          city: 'San Francisco',
          userId: 27,
          description: 'Startup founder and technology geek.',
        },
        {
          name: 'Yara',
          age: 25,
          gender: 'Female',
          city: 'Seattle',
          userId: 28,
          description: 'Musician and songwriter.',
        },
        {
          name: 'Zane',
          age: 28,
          gender: 'Male',
          city: 'Austin',
          userId: 29,
          description: 'Motorcycle enthusiast and traveler.',
        },
        {
          name: 'Ava',
          age: 30,
          gender: 'Female',
          city: 'New York',
          userId: 30,
          description: 'Art historian and gallery curator.',
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
