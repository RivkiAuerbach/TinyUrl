import linkModel from '../models/link.js';

const linkController={
getList: async (req, res) => {
  try {
      console.log("im here!!!");
      const links = await linksModel.find()
      console.log( "links", links)
      res.json({ links })
  }
  catch (e) {
      res.status(400).json({ message: e.message })
  }
},

getById: async (req, res) => {
  const linkId = req.params.id
  try {
      const link = await linkModel.findById(linkId)
      console.log({ link })
      res.json({ link })
  }
  catch (e) {
      res.status(400).json({ message: e.message })
  }
},

add: async (req, res) => {
  const {originalUrl } = req.body
  try {
      const newLink = await linkModel.create({originalUrl })
      res.json({ newLink })
  }
  catch (e) {
      res.status(400).json({ message: e.message })
  }
},

update: async (req, res) => {
  const { id } = req.params.id
  try {
      const updateLink = await linkModel.findByIdAndUpdate(id, req.body, {
          new: true
      })
      res.json({ updateLink })
  }
  catch (e) {
      res.status(400).json({ message: e.message })
  }
},



delete: async (req, res) => {
  const { id } = req.params
  try {
      const deleteLink = await linkModel.findByIdAndDelete(id)
      res.json({ deleteLink })
  }
  catch (e) {
      res.status(400).json({ message: e.message })
  }
}
}

export default linkController
