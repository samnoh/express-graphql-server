const user = (sequelize, DataTypes) =>
    sequelize.define(
        'user',
        {
            username: {
                type: DataTypes.STRING(140),
                unique: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            timestamps: true,
            paranoid: true,
            charset: 'utf8'
        }
    );

export default user;
