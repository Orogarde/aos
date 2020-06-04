const { profil_aos } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateProfil', (req, res) =>{
        const profilAos = req.body;
        profil_aos.update({ sauvegarde:profilAos.sauvegarde,
            blessure:profilAos.blessure,
            bravoure:profilAos.bravoure,
            mouvement:profilAos.mouvement,
            aosPts:profilAos.aosPts,
            modeleId:profilAos.modeleId,},{
           where: {
            profilId: profilAos.profilId,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}