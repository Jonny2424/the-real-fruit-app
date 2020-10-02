const User = require('../models').User;
const Fruit = require('../models').Fruit;

// shows profile page of person. passes user and index
const profilePage = (req, res) => {
    User.findByPk(req.user.id, {
        include: [
            {
                model: Fruit,
                attributes: ['id', 'name']
            }
        ]
    })
    .then(userProfile => {
        console.log(userProfile);
        res.render('users/profilePage.ejs', {
            user: userProfile
        })
    })
}
// checks to see if user is in the system. If so, login to their page. If not,
// do nothing


const editProfile = (req, res) => {
    User.update(req.body, {
        where: { id: req.params.index },
        returning: true // MUST NEED TO SHOW CHANGE
    })
        .then(user => {
            res.redirect(`/users/profile`
            )
        })
}

const deleteProfile = (req, res) => {
    User.destroy({ where: { id: req.params.index } })
        .then(() => {
            res.redirect('/users');
        })
}



module.exports = {
    
    profilePage,
    editProfile,
    deleteProfile
}