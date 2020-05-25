const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.get('/findBattletomes', (req, res) =>{
        battle.findAll({
           /* where: {
                description: "test",
              },
              include: unite_aos, */
        }).then((data)=>{
             console.log(data);
             res.json(data);
        })
    })
}