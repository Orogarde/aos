const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteUnite', (req, res) =>{
        const unit = req.body; 
        unite_aos.destroy({
           where: {
                uniteId: unit.unitId,
              },
        }).then((data)=>{
             //console.log(data);
            res.json(data);
        })
    })
}