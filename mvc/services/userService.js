const User = require('../models/userModel');

const getAllUsers = async () => {
  return await User.findAll();
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const findUserByTelAndPassword = async (tel, password) => {
  try {
    const user = await User.findOne({
      where: {
        telIndex: telIndex,
        password: password
      }
    });

    if (user) {
      return user;  // Retourne l'utilisateur trouvé
    } else {
      return null;  // Retourne null si aucun utilisateur n'est trouvé
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    throw error;  // Propage l'erreur
  }
};

 
module.exports = {
  getAllUsers,
  createUser,
  findUserByTelAndPassword
};
