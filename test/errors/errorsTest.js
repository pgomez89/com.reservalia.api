"use strict";

const assert = require("assert");
const Errors = require("../../lib/errors");

describe("Controllers Errors Test", () => {
    it("Deberia traer un boom error que diga cannot access",() => {
        assert.ok(Errors.cannotAccess);
    });
});