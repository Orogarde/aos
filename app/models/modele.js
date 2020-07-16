module.exports = (sequelize, type)=> {
    return sequelize.define('modele',{
       modeleId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       nom: type.STRING,
       est_chef: type.BOOLEAN
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'modele'
     })
};