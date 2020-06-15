const { apti_c,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findAptitudesCommandements', (req, res) =>{
        apti_c.findAll({
            include : model,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}