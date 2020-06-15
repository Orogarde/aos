const { apti } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateAptitude', (req, res) =>{
        const aptitudeAos = req.body;
        apti.update({ nom:aptitudeAos.nom,
            effet:aptitudeAos.effet,
            aosPts:aptitudeAos.aosPts,
            modeleId:aptitudeAos.modeleId,},{
           where: {
            aptitudeId: aptitudeAos.aptitudeId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}