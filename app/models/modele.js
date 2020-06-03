module.exports = (sequelize, type)=> {
    return sequelize.define('modele',{
       modeleId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       nom: type.STRING,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'modele'
     })
};