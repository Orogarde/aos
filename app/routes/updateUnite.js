const { battle,unite_aos } = require('../sequelize')


module.exports = (app) =>{
    app.put('/updateUnite', (req, res) =>{
        const unit = req.body; 
        unite_aos.update({ description:unit.description, visuel:unit.visuel, taille_min:unit.taille_min,taill_max:unit.taill_max,cout_min:unit.cout_min,cout_max:unit.cout_max,taille_critique:unit.taille_critique,battletomeId:unit.battletomeId},{
           where: {
                uniteId: unit.uniteId,
              },
        }).then((data)=>{
            // console.log(data);
             res.json(data);
        })
    })
}