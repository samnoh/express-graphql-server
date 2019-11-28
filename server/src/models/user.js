import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                username: {
                    type: DataTypes.STRING(140),
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: false
                },
                role: {
                    type: DataTypes.ENUM('admin', 'user', 'suspended'),
                    defaultValue: 'user'
                }
            },
            {
                sequelize,
                tableName: 'user',
                modelName: 'user',
                hooks: {
                    beforeCreate(user) {
                        return new Promise((resolve, reject) => {
                            bcrypt.genSalt(14, (error, salt) => {
                                if (error) reject(error);

                                bcrypt.hash(user.password, salt, (err, hash) => {
                                    if (err) reject(err);
                                    // eslint-disable-next-line no-param-reassign
                                    user.password = hash;
                                    resolve();
                                });
                            });
                        });
                    }
                }
            }
        );
    }

    comparePassword(candidatePassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
                if (error) reject(error);
                if (!isMatch) reject();
                resolve();
            });
        });
    }
}

export default User;
