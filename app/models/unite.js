module.exports = (sequelize, type)=> {
    return sequelize.define('unite',{
       uniteId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       description: type.STRING,
       taille_min: type.INTEGER,
       taille_max: type.INTEGER,
       cout_min: type.INTEGER,
       cout_max: type.INTEGER,
       taille_critique: type.INTEGER,
       visuel: type.STRING,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'unite'
     })
};