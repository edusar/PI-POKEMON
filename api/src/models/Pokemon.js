const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    id : {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey : true
     },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false
    },
    hp:{
      type: DataTypes.STRING,
      allowNull: false
    },
    attack:{
      type: DataTypes.STRING,
      allowNull: false
    },
    defense:{
      type: DataTypes.STRING,
      allowNull: false
    },
    speed:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true
    },
    createdBy:{
      type:DataTypes.STRING,
      defaultValue:"Eduardo Maldonado"

    }



  });
};
