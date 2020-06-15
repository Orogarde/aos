const { apti_c } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createAptitudeCommandement', (req, res) =>{
        const nom = req.body.nom;
        const effet = req.body.effet;
        const aosPts = req.body.aosPts;
        const modeleId = req.body.modeleId;
        apti_c.create({
           nom, 
           effet, 
           aosPts,
           modeleId,
        }).then((data)=>{
             res.json(data);
        })
    })
}