"use strict";

const assert = require("assert");
const Errors = require("../../lib/errors");
const Boom = require("boom");

describe("Controllers Errors Test", () => {
    it("Deberia traer un boom error que diga cannot access",() => {
        assert.ok(Errors.cannotAccess);
    });
});