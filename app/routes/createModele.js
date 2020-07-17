const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createModele', (req, res) =>{
        const nom = req.body.nom;
        const est_special = req.body.est_special
        const uniteId = req.body.uniteId;
        model.create({
           nom,
           est_special,
           uniteId,
        }).then((data)=>{
             res.json(data);
        })
    })
}