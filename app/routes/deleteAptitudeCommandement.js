const { apti_c} = require('../sequelize')


module.exports = (app) =>{
    app.post('/deleteAptitudeCommandement', (req, res) =>{
        const aptitudeCAos = req.body; 
        apti_c.destroy({
           where: {
                aptitudeCId: aptitudeCAos.aptitudeIdSup,
              },
        }).then((data)=>{
             //console.log(data);
             res.json(data);
        })
    })
}