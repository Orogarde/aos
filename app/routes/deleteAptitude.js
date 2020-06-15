const { apti} = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteAptitude', (req, res) =>{
        const aptitudeAos = req.body; 
        apti.destroy({
           where: {
                aptitudeId: aptitudeAos.aptitudeIdSup,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}