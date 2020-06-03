const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateModele', (req, res) =>{
        const modele = req.body; 
        model.update({ nom:modele.nom, uniteId:modele.uniteId},{
           where: {
                modeleId: modele.modeleId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}