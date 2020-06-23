const { battle,unite_aos } = require('../sequelize')

module.exports = (app) =>{
    app.post('/findUnitesSpe', (req, res) =>{
        const idBt = req.body.id;
        unite_aos.findAll({
           where: {
            battletomeId : idBt,
          },
        }).then((data)=>{
             res.json(data);
        })
    })
}