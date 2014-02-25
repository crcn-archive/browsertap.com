var Collection = require("bindable").Collection;

function BaseCollection () {
  Collection.call(this);
}

Collection.extend(BaseCollection, {

});

module.exports = Collection;