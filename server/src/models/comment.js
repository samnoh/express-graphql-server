import Sequelize from 'sequelize';

class Comment extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'comment',
                modelName: 'comment',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }
}

export default Comment;
