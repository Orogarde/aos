module.exports = (sequelize, type)=> {
    return sequelize.define('effet',{
       effetId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       blessure: type.STRING,
       nom: type.STRING,
       valeur: type.STRING,
       aosPts: type.DECIMAL
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'effet'
     })
};