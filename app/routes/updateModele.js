const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateModele', (req, res) =>{
        const modele = req.body; 
        model.update({ nom:modele.nom, est_special:modele.est_special,uniteId:modele.uniteId},{
           where: {
                modeleId: modele.modeleId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}