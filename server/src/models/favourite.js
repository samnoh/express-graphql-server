import Sequelize from 'sequelize';

class Favourite extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {},
            {
                sequelize,
                tableName: 'favourite',
                modelName: 'favourite'
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, {
            onDelete: 'CASCADE',
            hooks: true
        });
        this.belongsTo(models.Post, {
            onDelete: 'CASCADE',
            hooks: true
        });
    }
}

export default Favourite;
