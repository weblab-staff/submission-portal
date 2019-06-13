const Class = require('../models/Class');

function get_active_year() {
    Class.findOne({}).then(current_class => {
        return current_class.active_year;
    })
}