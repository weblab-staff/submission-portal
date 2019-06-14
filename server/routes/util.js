const Class = require("../models/Class");

function query_active_year() {
  return Class.find({}).then(classes => {
    for (let individual_class of classes) {
      if (individual_class.is_active) {
        return individual_class.year;
      }
    }
  });
}

/**
 * @param {Object} req express route (req) param.
 */
async function query_filter_year(req) {
  if (req.query.class_year) {
    return Number(req.query.class_year);
  } else {
    return await query_active_year();
  }
}

module.exports = {
  get_active_year: query_active_year,
  get_filter_year: query_filter_year
};
