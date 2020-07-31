module.exports = (sequelize, type)=> {
    return sequelize.define('arme',{
       armeId : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
       } ,
       nom: type.STRING,
       portee: type.STRING,
       nb_attaque: type.STRING,
       touche: type.STRING,
       blesse: type.STRING,
       perforation: type.STRING,
       degat:type.STRING,
       aosPts: type.DECIMAL,
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'arme'
     })
};