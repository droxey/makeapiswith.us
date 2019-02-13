const Api = require('./api.model');
const User = require('../users/user.model');
//  Index all API Objects
async function Index(req, res) {
  res.json(await Api.find());
}

//  Get specific Api object
async function Get(req, res) {
  res.json(await Api.findById(req.params.id).populate('author').populate({
    path: 'comments',
        populate: {
            path: 'author'
        }
}));
}

//  Returns all api objects with certain
async function IndexByTag(req, res) {
  res.json(await Api.find({ tags: req.params.tag }));
}

//  Creates new Api object and saves it to a User
async function Create(req, res) {
  const api = new Api(req.body);
  api.author = req.user._id;
  await api.save();
  const user = await User.findById(req.user._id);
  user.apis.unshift(api);
  await user.save();
  return res.status(200).send('API successfully created!');
}

//  Updates Api information
async function Update(req, res) {
  res.json(await Api.findByIdAndUpdate(req.params.id, req.body));
}

//  Deletes a specific API 
//  !see if it need be removed from the user as well
async function Delete(req, res) {
  await Api.findOneAndDelete({ _id: req.params.id });
  return res.status(200).send('API was successfully deleted')
}

module.exports = {
  Index,
  Get,
  Create,
  IndexByTag,
  Delete,
  Update,
};
