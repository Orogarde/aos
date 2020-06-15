const { apti,model } = require('../sequelize')

module.exports = (app) =>{
    app.get('/findAptitudes', (req, res) =>{
        apti.findAll({
            include : model,
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}