module.exports = (sequelize, type)=> {
    return sequelize.define('utilisateur',{
       utilisateurId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       login: type.STRING,
       password: type.STRING,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'utilisateur'
     })
};