import Sequelize from 'sequelize';
import battletome from './models/battletome';
import unite from './models/unite';
import utilisateur from './models/utilisateur';
import modele from './models/modele';

const sequelize = new Sequelize('aos','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

const battle = battletome(sequelize, Sequelize);
const unite_aos = unite(sequelize, Sequelize);
const util = utilisateur(sequelize,Sequelize);
const model = modele(sequelize,Sequelize);

battle.hasMany(unite_aos,{
    foreignKey: 'battletomeId',
});
unite_aos.belongsTo(battle, {
    foreignKey: 'battletomeId',
});

unite_aos.hasMany(model,{
    foreignKey: 'uniteId',
});
model.belongsTo(unite_aos, {
    foreignKey: 'uniteId',
});

sequelize.sync()
    .then(() => {
    console.log("super");
});

module.exports = {
    battle,
    unite_aos,
    util,
    model,
  }
