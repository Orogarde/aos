const { battle,unite_aos } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findUnites', (req, res) =>{
        unite_aos.findAll({
           include : battle,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}