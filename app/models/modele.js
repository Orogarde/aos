module.exports = (sequelize, type)=> {
    return sequelize.define('modele',{
       modeleId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       nom: type.STRING,
       est_special: type.BOOLEAN
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'modele'
     })
};