const post = (sequelize, DataTypes) =>
    sequelize.define(
        'post',
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
            timestamps: true,
            paranoid: true,
            charset: 'utf8'
        }
    );

export default post;
