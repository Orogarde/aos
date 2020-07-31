module.exports = (sequelize, type)=> {
    return sequelize.define('aptitude_commandement',{
       aptitudeCId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       nom: type.STRING,
       effet: type.STRING,
       aosPts: type.DECIMAL,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'aptitude_commandement'
     })
};