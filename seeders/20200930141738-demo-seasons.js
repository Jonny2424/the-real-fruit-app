'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Seasons', [
        {
          name:'Summer'
        },
        {
          name:'Winter'
        },
        {
          name:'Spring'
        },
        {
          name: 'Autumn'
        } 
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seasons', null, {});
  }
};
