var bcrypt = require("bcryptjs");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id_utilizador: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    username: { type: DataTypes.TEXT },
    password: { type: DataTypes.STRING, allowNull: false },
    nome: { type: DataTypes.STRING, notEmpty: true },
    morada: { type: DataTypes.STRING },
    cod_postal: { type: DataTypes.STRING },
    localidade: { type: DataTypes.STRING },
    distrito: { type: DataTypes.STRING },
    telefone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, validate: { isEmail: true }, unique: true },
    nacionalidade: { type: DataTypes.STRING },
    perfil: { type: DataTypes.STRING, allowNull: false },
  }, {
    freezeTableName: true,
    tableName: 'utilizadores',
    createdAt: 'createdAtDate',
    updatedAt: false
  });
  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password

  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};