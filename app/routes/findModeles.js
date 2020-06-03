const { battle,unite_aos,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findModeles', (req, res) =>{
        model.findAll({
           include : unite_aos,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}