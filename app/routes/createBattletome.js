const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/createBattletome', (req, res) =>{
        const description = req.body.descriptionBt;
        const visuel = req.body.visuelBt;
        battle.create({
           description,
           visuel
        }).then((data)=>{
             res.json(data);
        })
    })
}