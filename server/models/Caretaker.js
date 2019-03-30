const db = require('../controller/db')

const CareTaker = {
  create : async (id) => {

    const insertQuery = `INSERT INTO caretakers
        VALUES($1)
        returning *`;

    const values = [
      id
    ];

    try {
      const { rows } = await db.query(insertQuery, values);
      
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  getFullInfo: async (id) => {
    const findQuery = `SELECT u.first_name, u.last_name, u.email
                       FROM caretakers natural join users u`;
    const values = [
      id
    ];

    try {
      const { rows } = await db.query(findQuery, values);
      
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = CareTaker;