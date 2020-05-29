const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateBattletome', (req, res) =>{
        const bt = req.body; 
        battle.update({ description:bt.description, visuel:bt.visuel},{
           where: {
                battletomeId: bt.battletomeId,
              },
        }).then((data)=>{
             console.log(data);
             res.json(data);
        })
    })
}