const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteBattletome', (req, res) =>{
        const bt = req.body; 
        battle.destroy({
           where: {
                battletomeId: bt.btId,
              },
        }).then((data)=>{
             console.log(data);
             res.json(data);
        })
    })
}