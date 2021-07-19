const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },


    /* Expects 
    {
        "username": "lernantino", 
        "email": "lernantino@gmail.com"
    }
    */
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                return Thought.deleteMany({ username: dbUserData.username})
                // res.json(dbUserData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    }
}

module.exports = userController;