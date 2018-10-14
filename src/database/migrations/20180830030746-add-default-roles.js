module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert('role', [
      {
        id: 1,
        name: 'Admin',
        type: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'User',
        type: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface => queryInterface.bulkDelete('role', null),
}
