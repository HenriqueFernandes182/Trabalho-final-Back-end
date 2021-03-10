import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        quantidade: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        marca_uid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'marcas',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Marca, {
      as: 'marcas',
      foreignKey: 'marca_uid',
    });
  }
}
export default Produto;
