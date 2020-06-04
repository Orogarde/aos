module.exports = (sequelize, type)=> {
    return sequelize.define('profil',{
       profilId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       sauvegarde: type.STRING,
       blessure: type.STRING,
       bravoure: type.STRING,
       mouvement: type.STRING,
       aosPts: type.STRING
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'profil'
     })
};