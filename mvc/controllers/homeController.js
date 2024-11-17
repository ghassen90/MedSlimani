 

const homePage = async (req, res) => {
  try {
 
    res.status(200).json({message :"welcome"});
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};
 

module.exports = {
  homePage 
};
