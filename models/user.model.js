module.exports = (sequelize, DataTypes) => {
  User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Please enter a valid name, Name can have only letters"
        }
      }
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Please enter a valid name, Name can have only letters"
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address",
        },
      },
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Age must be a number"
        }
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 150],
          msg: "Length of password must be between 8 to 15"
        }
      },
    },

    is_admin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
