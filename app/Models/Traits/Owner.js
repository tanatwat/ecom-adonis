class Owner {

  register(Model, options) {
    Model.queryMacro('ownerIs', function (value) {
      this.where('client_id', value)
      return this
    })
  }
}

module.exports = Owner