
class Model {

  constructor(schema) {
    this.schema = schema;
  }


  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }


  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }


  create(record) {
    console.log('record',record);
    // eslint-disable-next-line new-cap
    let newRecord = new this.schema(record);
    console.log('new', newRecord);
    return newRecord.save();
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
