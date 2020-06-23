const { model,profil_aos,apti,apti_c,arme_aos,effet_aos,unite_aos } = require('../sequelize')

module.exports = (app) =>{
    app.post('/findUnitesDetails', (req, res) =>{
        const idUnite = req.body.id;
        model.findAll({
           where: {
            uniteId : idUnite,
          },
          include: [profil_aos,apti,apti_c,arme_aos,effet_aos
            
          ],
        }).then((data)=>{
             res.json(data);
        })
    })
}