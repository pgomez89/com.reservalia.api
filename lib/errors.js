"use strict";

let internals = {
    STATUS_CODES:Object.setPrototypeOf({
        '400001': "Cannot access to service",
        '400002': "No hotel",
        '500001': "No hotel",
    },null)
};

internals.create = function (statusCode, message, data, ctor) {
    const error = new Error(message ? message : undefined);       // Avoids settings null message
    Error.captureStackTrace(error, ctor);                       // Filter the stack to our external API
    //error.data = data || null;
    internals.initialize(error, statusCode);
    return error;
};

internals.initialize = function (error, statusCode, message) {

    error.output = {};

    error.reformat = internals.reformat;
    error.reformat(statusCode);
    delete error.reformat;

    if (!message && !error.message) {
        message = error.output.error;
    }

    if (message) {
        error.message = (message + (error.message ? ': ' + error.message : ''));
    }

    return error;
};

internals.reformat = function (statusCode) {

    this.output.statusCode = statusCode;
    this.output.error = internals.STATUS_CODES[statusCode] || 'Unknown';

    if (this.message) {
        this.output.message = this.message;
    }
};

module.exports = {
    cannotAccess: internals.create(400001,"Can't access to data"),
    noHotel:internals.create(400002,"No hotel")
};
