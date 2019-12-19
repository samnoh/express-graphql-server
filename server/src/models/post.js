import Sequelize from 'sequelize';

class Post extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                title: {
                    type: DataTypes.STRING(140),
                    allowNull: false
                },
                content: {
                    type: DataTypes.TEXT
                }
            },
            {
                sequelize,
                tableName: 'post',
                modelName: 'post',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, {
            onDelete: 'CASCADE',
            hooks: true
        });
        this.hasMany(models.Comment, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            }
        });
        this.hasMany(models.Favourite, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            }
        });
    }
}

export default Post;
