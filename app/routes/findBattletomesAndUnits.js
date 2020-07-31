const { battle,unite_aos,model,profil_aos,apti,apti_c,arme_aos,effet_aos, } = require('../sequelize')


module.exports = (app) =>{
    app.get('/findBattletomesAndUnits', (req, res) =>{
            unite_aos.findAll({
            // attributes: ['description', 'uniteId'],
            include: [
                battle,
                {
                model: model,
                include: [
                    {
                        model: profil_aos,
                        attributes: ['aosPts']
                    },
                    {
                        model: apti,
                        attributes: ['aosPts']
                    },
                    {
                        model: apti_c,
                        attributes: ['aosPts']
                    },
                    {
                        model: arme_aos,
                        attributes: ['aosPts']
                    },
                    {
                        model: effet_aos,
                        attributes: ['aosPts']
                    }
                ]
                }
            ]})
            .then((data)=>{
                console.log(data);
                res.json(data);
            })
    })
}