import linkModel from '../models/link.js';
import userModel from '../models/user.js';

const linkController={

getList: async (req, res) => {
  try {
      console.log("im here!!!");
      const links = await linkModel.find()
      console.log( "links", links)
      res.json({ links })
  }
  catch (e) {
      res.status(400).json({ message: e.message  })
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

redirect: async (req, res) => {
    try {  
        const link = await linkModel.findById(req.params.id);
        if (!link) {  
           return res.status(404).send({ message: 'Link not found' });
       }

       // שמירת הקליק
       const click = {
           ipAddress: req.ip,
           targetParamValue: req.query[link.targetParamName] || 'unknown'
       };
       link.clicks.push(click);
       await link.save();

       // הפניה לקישור המקורי
       res.redirect(link.originUrl);

    }  catch (e) {
               res.status(400).json({ message: e.message })
      }  
},

// add: async (req, res) => {
//   const {originUrl } = req.body
//   try {
//       const newLink = await linkModel.create({originUrl })
//       res.json({ newLink })
//   }
//   catch (e) {
//       res.status(400).json({ message: e.message })
//   }
// },


add: async (req, res) => {
    const { userId, originUrl, targetParamName, targetValues } = req.body;
    try {
      const newLink = {
        originUrl,
        targetParamName: targetParamName || "t",
        targetValues: targetValues || []
      };
  
      const link = await linkModel.create(newLink)
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.links.push(link._id);
      await user.save();
  
      const shortUrl = `http://localhost:3000/links/${link._id}`;
      res.status(201).json({ shortUrl });
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
},

getClicks:async(req,res)=>{
    try {
        const link = await linkModel.findById(req.params.id);
        if (!link) {
            return res.status(404).send({ message: 'Link not found' });
        }

        // פילוח נתוני הקליקים לפי מקור
        const clicksByTarget = link.clicks.reduce((acc, click) => {
            const target = click.targetParamValue || 'unknown';
            if (!acc[target]) {
                acc[target] = 0;
            }
            acc[target]++;
            return acc;
        }, {});

        res.status(200).send(clicksByTarget);
        
    }  catch (e) {
        res.status(400).json({ message: e.message })
    }
}

}

export default linkController
