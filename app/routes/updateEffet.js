const { effet_aos } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateEffet', (req, res) =>{
        const effetAos = req.body;
        effet_aos.update({ nom:effetAos.nom,
            blessure:effetAos.blessure,
            valeur:effetAos.valeur,
            aosPts:effetAos.aosPts,
            modeleId:effetAos.modeleId,},{
           where: {
            effetId: effetAos.effetId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}