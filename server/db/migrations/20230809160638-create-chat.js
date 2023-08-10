/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'UserInfos',
          },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      recipientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'UserInfos',
          },
          key: 'id',
        },
        allowNull: true,
        onDelete: 'SET NULL',
      },
      message: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  },
};
