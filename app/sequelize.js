import Sequelize from 'sequelize';
import battletome from './models/battletome';
import unite from './models/unite';
import utilisateur from './models/utilisateur';
import modele from './models/modele';
import profil from './models/profil';
import aptitude from './models/aptitude';
import aptitude_c from './models/aptitude_commandent';

const sequelize = new Sequelize('aos','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

const battle = battletome(sequelize, Sequelize);
const unite_aos = unite(sequelize, Sequelize);
const util = utilisateur(sequelize,Sequelize);
const model = modele(sequelize,Sequelize);
const profil_aos = profil(sequelize,Sequelize);
const apti = aptitude(sequelize,Sequelize);
const apti_c = aptitude_c(sequelize,Sequelize);

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

model.hasMany(profil_aos,{
    foreignKey: 'modeleId',
});
profil_aos.belongsTo(model, {
    foreignKey: 'modeleId',
});

model.hasMany(apti,{
    foreignKey: 'modeleId',
});
apti.belongsTo(model, {
    foreignKey: 'modeleId',
});

model.hasMany(apti_c,{
    foreignKey: 'modeleId',
});
apti_c.belongsTo(model, {
    foreignKey: 'modeleId',
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
    profil_aos,
    apti,
    apti_c,
  }
