export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId })

  if (!doc) {
    return res.status(404).end()
  }

  return res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  const docs = await model.find({ createdBy: userId })

  if (!docs) {
    return res.status(404).end()
  }

  return res.status(200).json({ data: docs })
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  const doc = await model.create({ name: req.body.name, createdBy: userId })
  if (!doc) {
    return res.status(500).end()
  }
  return res.status(201).json({
    data: {
      name: doc.name,
      createdBy: doc.createdBy
    }
  })
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id
    },
    req.body,
    { new: true }
  )
  if (!doc) {
    return res.status(404).end()
  }
  return res.status(200).json({
    data: doc
  })
}

export const removeOne = model => async (req, res) => {
  const doc = await model.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id
  })

  if (!doc) {
    return res.status(404).end()
  }

  return res.status(200).json({
    data: doc
  })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
