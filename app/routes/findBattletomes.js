const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.get('/findBattletomes', (req, res) =>{
        battle.findOne({
            where: {
                description: "test",
              },
              include: unite_aos,
        }).then((data)=>{
             console.log(data);
             res.json(data);
        })
    })
}