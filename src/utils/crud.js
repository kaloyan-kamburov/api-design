export const getOne = model => async (req, res) => {
  try {
    const modelInstance = await model.findById(req.id).exec()

    if (!modelInstance) {
      res.status(400)
    }

    res.status(200).send(modelInstance)
  } catch (error) {
    req.status(400)
  }
}

export const getMany = model => async (req, res) => {
  try {
    const modelInstance = await model.find().exec()
    res.status(200).send(modelInstance)
  } catch (error) {
    res.status(400).send({
      msg: 'Error occured while getMany',
      error
    })
  }
}

export const createOne = model => async (req, res) => {
  try {
    const modelInstance = await model.create(req.body)
    res.status(200).send(modelInstance)
  } catch (error) {
    res.status(400).send({
      msg: 'Error occured',
      error
    })
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const modelInstance = await model.findOneAndUpdate(req.body.id, {
      name: req.body.name
    })
    res.status(200).send({
      msg: 'Document updated',
      model: modelInstance
    })
  } catch (error) {
    res.status(400).send({
      msg: 'Error occured while updating',
      error
    })
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const modelInstance = await model.findOneAndDelete({ id: req.body.id })
    res.status(200).send({
      msg: 'Document deleted',
      model: modelInstance
    })
  } catch (error) {
    res.status(400).send({
      msg: 'Error occured while deleting',
      error
    })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
