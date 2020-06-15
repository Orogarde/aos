const { apti } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createAptitude', (req, res) =>{
        const nom = req.body.nom;
        const effet = req.body.effet;
        const aosPts = req.body.aosPts;
        const modeleId = req.body.modeleId;
        apti.create({
           nom, 
           effet, 
           aosPts,
           modeleId,
        }).then((data)=>{
             res.json(data);
        })
    })
}