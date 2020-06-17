const { effet_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createEffet', (req, res) =>{
        const nom = req.body.nom;
        const blessure = req.body.blessure;
        const valeur = req.body.valeur;
        const aosPts = req.body.aosPts;
        const modeleId = req.body.modeleId;
        effet_aos.create({
           nom,
           blessure,
           valeur,
           aosPts,
           modeleId,
        }).then((data)=>{
             res.json(data);
        })
    })
}