module.exports = (sequelize, type)=> {
    return sequelize.define('battletome',{
       battletomeId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       description: type.STRING,
       visuel: type.STRING,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'battletome'
     })
};