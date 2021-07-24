const { User, Thought } = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    /* Expects
    {
        "thoughtText": "text"
        "username": name
        "userId": "id#"
    } 
    */
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
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

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            // only able to update text
            { thoughtText: body.thoughtText },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: { _id: dbThoughtData._id } } },
                    { new: true }
                );
            })
            .then(() => res.json({ message: 'thought deleted successfully' }))
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    // reactions

    /* Expects
    {
        "reactionBody": "text",
        "username": "name"
    }
    */
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .select('-__v -_id -id')

            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'thought and/or reaction do not exist' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.error(err);
                res.status(400).json(err);
            });
    }

}

module.exports = thoughtController;
