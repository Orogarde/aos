const { battle,unite_aos,model } = require('../sequelize')


module.exports = (app) =>{
    app.get('/findBattletomesAndUnits', (req, res) =>{
        unite_aos.findAll({
        // attributes: ['description', 'uniteId'],
              include: [battle,model] 
        }).then((data)=>{
             res.json(data);
        })
    })
}