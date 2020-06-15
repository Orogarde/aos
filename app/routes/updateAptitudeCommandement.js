const { apti_c } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateAptitudeCommandement', (req, res) =>{
        const aptitudeCAos = req.body;
        apti_c.update({ nom:aptitudeCAos.nom,
            effet:aptitudeCAos.effet,
            aosPts:aptitudeCAos.aosPts,
            modeleId:aptitudeCAos.modeleId,},{
           where: {
            aptitudeCId: aptitudeCAos.aptitudeCId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}