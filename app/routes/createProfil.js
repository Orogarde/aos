const { profil_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createProfil', (req, res) =>{
        const sauvegarde = req.body.sauvegarde;
        const blessure = req.body.blessure;
        const bravoure = req.body.bravoure;
        const mouvement = req.body.mouvement;
        const aosPts = req.body.aosPts;
        const modeleId = req.body.modeleId;
        profil_aos.create({
           sauvegarde,
           blessure,
           bravoure,
           mouvement,
           aosPts,
           modeleId,
        }).then((data)=>{
             res.json(data);
        })
    })
}