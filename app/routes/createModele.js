const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createModele', (req, res) =>{
        const nom = req.body.nom;
        const uniteId = req.body.uniteId;
        model.create({
           nom,
           uniteId,
        }).then((data)=>{
             res.json(data);
        })
    })
}