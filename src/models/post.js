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
            { sequelize, tableName: 'post', modelName: 'post' }
        );
    }
}

export default Post;
