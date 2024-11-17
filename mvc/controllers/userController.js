const userService = require('../services/userService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
};

const loginUser = async (req, res) => {
  const { tel, password } = req.body;

  try {
    // Rechercher l'utilisateur par téléphone
    const user = await userService.findUserByTelAndPassword(tel);

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier le mot de passe (si vous utilisez bcrypt)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Mot de passe incorrect'
      });
    }

    res.status(200).json({
      message: 'Connexion réussie',
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};



module.exports = {
  getUsers,
  createUser,
  loginUser
};
