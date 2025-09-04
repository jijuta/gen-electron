
const setctrl = function (payload, self) {
    let reqProtocol = "`${req.protocol}://${req.get('host')}`;";
    let urlFilePath = "`${url}/${file.path}`;";
    let vHtml = `
/**
 * @Class Name : ${payload.Sample}List.jsp
 * @Description : ${payload.pageTitle}List 화면
 * @Modification Information
 * @
 * @  수정일         수정자             수정내용
 * @ -------		--------    ---------------------------
 * @ ${payload.pageTodays}   AUTO               최초 생성
 * @author AUTO
 * @since ${payload.pageTodays}
 * @version 1.0
 * @see
 *
 */
const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const ${payload.sampleNmFirst} = require('../models/${payload.SampleSm}');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a ${payload.SampleSm}
router.post('/${payload.SampleSm}', auth.enhance, async (req, res) => {
  const ${payload.SampleSm} = new ${payload.sampleNmFirst}(req.body);
  try {
    await ${payload.SampleSm}.save();
    res.status(201).send(${payload.SampleSm});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/${payload.SampleSm}s/photo/:id', upload('${payload.SampleSm}s').single('file'), async (req, res, next) => {
  const url = ${reqProtocol}
  const { file } = req;
  const idx = req.params.id;
  try {
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.findById(idx);
    if (!${payload.SampleSm}) return res.sendStatus(404);
    ${payload.SampleSm}.image = ${urlFilePath}
    await ${payload.SampleSm}.save();
    res.send({ ${payload.SampleSm}, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

// Get all ${payload.SampleSm}s
router.get('/${payload.SampleSm}s', async (req, res) => {
  try {
    const ${payload.SampleSm}s = await ${payload.sampleNmFirst}.find({});
    res.send(${payload.SampleSm}s);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get ${payload.SampleSm} by id
router.get('/${payload.SampleSm}s/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.findById(_id);
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update ${payload.SampleSm} by id
router.patch('/${payload.SampleSm}s/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [${payload.allowedUpdates}];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.findById(_id);
    updates.forEach((update) => (${payload.SampleSm}[update] = req.body[update]));
    await ${payload.SampleSm}.save();
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete ${payload.SampleSm} by id
router.delete('/${payload.SampleSm}s/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.findByIdAndDelete(_id);
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.sendStatus(400);
  }
});

// ${payload.sampleNmFirst} User modeling (GET ALL ${payload.SampleLg}S)
router.get('/${payload.SampleSm}s/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const ${payload.sampleNmFirst}s = await ${payload.sampleNmFirst}.find({});
    const ${payload.sampleNmFirst}UserModeled = await userModeling.${payload.sampleNmFirst}UserModeling(${payload.sampleNmFirst}, username);
    res.send(${payload.sampleNmFirst}UserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all2 /${payload.SampleUrl}/insert${payload.Sample},do
const url = {
    add:"/${payload.etc1}/${payload.SampleUrl}/insert${payload.Sample}.do",
	del:"/${payload.etc1}${payload.SampleUrl}/delete${payload.Sample}.do",
	fin:"/${payload.etc1}${payload.SampleUrl}/select${payload.Sample}ListJson",
	udp:"/${payload.etc1}${payload.SampleUrl}/update${payload.Sample}.do",
	one:"/${payload.etc1}${payload.SampleUrl}/select${payload.Sample}Detail.do",
	get:"/${payload.etc1}${payload.SampleUrl}/select${payload.Sample}ListJson",
}

// Create a ${payload.SampleSm}
router.post('/${payload.etc1}/${payload.SampleUrl}/insert${payload.Sample}.do', auth.enhance, async (req, res) => {
  const ${payload.SampleSm} = new ${payload.sampleNmFirst}(req.body);
  try {
    await ${payload.SampleSm}.save();
    res.status(201).send(${payload.SampleSm});
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get all ${payload.etc1}${payload.SampleUrl}/select${payload.Sample}ListJson
router.get('/${payload.etc1}${payload.SampleUrl}/select${payload.Sample}ListJson', async (req, res) => {
  try {
    const ${payload.SampleSm}s = await ${payload.sampleNmFirst}.find({});
    res.send(${payload.SampleSm}s);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get ${payload.SampleSm} by id
router.get('${payload.etc1}${payload.SampleUrl}/select${payload.Sample}Detail.do', async (req, res) => {
  
  const ${payload.SampleSm} = new ${payload.sampleNmFirst}(req.body);
  const ids = {${payload.whereJson}};
  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.find(ids);
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.status(400).send(e);
  }
});


// Update "/${payload.etc1}${payload.SampleUrl}/update${payload.Sample}.do" by id
router.post('/${payload.etc1}/${payload.SampleUrl}/update${payload.Sample}.do', auth.enhance, async (req, res) => {
  const ids = {${payload.whereJson}};
  const updates = Object.keys(req.body);
  const allowedUpdates = [${payload.allowedUpdates}];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.findOne(ids);
    updates.forEach((update) => (${payload.SampleSm}[update] = req.body[update]));
    await ${payload.SampleSm}.save();
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete "/${payload.etc1}${payload.SampleUrl}/delete${payload.Sample}.do/:id' by id
router.get("/${payload.etc1}${payload.SampleUrl}/delete${payload.Sample}.do', auth.enhance, async (req, res) => {
  const ids = {${payload.whereJson}};
  try {
    const ${payload.SampleSm} = await ${payload.sampleNmFirst}.deleteOne(ids);
    if (!${payload.SampleSm}) return res.sendStatus(404);
    return res.send(${payload.SampleSm});
  } catch (e) {
    return res.sendStatus(400);
  }
});

module.exports = router;

    `;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}