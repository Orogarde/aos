const { arme_aos,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findArmes', (req, res) =>{
        arme_aos.findAll({
            include : model,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}