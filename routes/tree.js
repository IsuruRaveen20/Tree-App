// const express = require('express');
// const router = express.Router();
// const treeController = require('../controllers/tree');
// const authmiddlewares = require('../middlewares/auth');

const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');
const authMiddleware = require('../middlewares/auth');

router.get('/', async (req, res, next) => {
  try {
    const trees = await Tree.find();
    res.json(trees);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const tree = new Tree(req.body);
    await tree.save();
    res.json(tree);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// // POST /tree (create a new tree)
// router.post('/', authmiddlewares, treeController.createTree);

// // GET /tree/:id (get a specific tree)
// router.get('/:id', authmiddlewares, treeController.getTree);

// // PUT /tree/:id (update a specific tree)
// router.put('/:id', authmiddlewares, treeController.updateTree);

// // DELETE /tree/:id (delete a specific tree)
// router.delete('/:id', authmiddlewares, treeController.deleteTree);

// module.exports = router;
