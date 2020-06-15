const { arme_aos } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateArme', (req, res) =>{
        const armeAos = req.body;
        arme_aos.update({ nom:armeAos.nom,
            portee:armeAos.portee,
            nb_attaque:armeAos.nb_attaque,
            touche:armeAos.touche,
            blessure:armeAos.blessure,
            mouvement:armeAos.mouvement,
            perforation:armeAos.perforation,
            degat:armeAos.degat,
            aosPts:armeAos.aosPts,
            modeleId:armeAos.modeleId,},{
           where: {
            armeId: armeAos.armeId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}