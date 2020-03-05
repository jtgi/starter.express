const HttpException = require('../http/HttpException');

const data = [];

const create = async id => {
  const entity = { id };
  data.push(entity);
  return entity;
};

const list = async filters => {
  return filters
    ? data.filter(u => filters.some(filter => filter === u.username))
    : data;
};

const fetch = async id => {
  const d = data.find(data => data.id === id);

  if (!d) {
    throw new HttpException(404, "Couldn't find");
  }

  return d;
};

module.exports = {
  create,
  list,
  fetch
};
