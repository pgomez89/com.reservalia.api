"use strict";

const debug = require("debug")("api:tests:controllers:MetricsController");

const metricsCtrl = require("../../controllers/metricsController.js");

const chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/**
 * Arrow Functions
 * Passing arrow functions to Mocha is discouraged.
 * Their lexical binding of the this value makes them unable to access the Mocha context,
 * and statements like this.timeout(1000); will not work inside an arrow function.
 */
describe("metrics controller", () => {

    it("Debería traer todos los intentos de la db", (done) => {
        metricsCtrl.getTotalAttemps({}).then(function(res){
            res[0].should.have.property("count");
            done()
        }).catch(function(err){
            done(err);
        });
    });

    it("Debería traer todos los intentos de hoy", (done) => {
        metricsCtrl.getTotalAttemps({date:0}).then(function(res){
            res[0].should.have.property("count");
            done()
        }).catch(function(err){
            done(err);
        });
    });

    it("Debería traer todas las ventas ok de la db", function(done) {
        metricsCtrl.getSalesOK({}).then(function(res){
            res.should.have.property('oneShot');
            res.should.have.property('extraSteps');
            done()
        }).catch(function(err){
            done(err);
        });
    });

    it("Debería traer todas las ventas ok de hoy", function(done) {
        metricsCtrl.getSalesOK({date:0}).then(function(res){
            res.should.have.property('oneShot');
            res.should.have.property('extraSteps');
            done()
        }).catch(function(err){
            done(err);
        });
    });

    it("Debería traer todas las ventas ok de la db con BOOKING_STATUS", (done) => {
        metricsCtrl.getSalesWithBookingStatus({}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });

    it("Debería traer todas las ventas ok de la db con BOOKING_STATUS de hoy", (done) => {
        metricsCtrl.getSalesWithBookingStatus({lastModified: 0}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });

    //Errors

    it("Debería traer los errores con BOOKING_STATUS de toda la db", (done) => {
        metricsCtrl.getErrorsWithBookingStatus({}, function (err, res) {
            expect(err).to.not.exist;
            expect(res[0]).to.have.all.keys(['_id', 'count']);
            return done();
        });
    });

    it("Debería traer los errores con BOOKING_STATUS de hoy", (done) => {
        metricsCtrl.getErrorsWithBookingStatus({lastModified: 0}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });

    it("Debería traer la cantidad de ventas fallidas con BOOKING_STATUS de toda las db", (done) => {
        metricsCtrl.getTotalErrors({}, function (err, res) {
            expect(err).to.not.exist;
            expect(res[0]).to.have.property('count');
            return done();
        });
    });

    //En el panel anterior no se usa.
    it("Debería traer la cantidad de ventas fallidas con BOOKING_STATUS de hoy", (done) => {
        metricsCtrl.getTotalErrors({lastModified: 0}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });


    it("Debería traer la cantidad de ventas fallidas sin BOOKING_STATUS de toda la db", (done) => {
        metricsCtrl.getUnknownErrors({}, function (err, res) {
            expect(err).to.not.exist;
            expect(res[0]).to.have.property('count');
            return done();
        });
    });

    it("Debería traer la cantidad de ventas fallidas sin BOOKING_STATUS de hoy", (done) => {
        metricsCtrl.getUnknownErrors({lastModified: 0}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });

    it("Debería traer los tokens expirados de toda la db", (done) => {
        metricsCtrl.getTotalTokens({}, function (err, res) {
            expect(err).to.not.exist;
            expect(res[0]).to.have.property('count');
            return done();
        });
    });

    it("Debería traer los tokens expirados de hoy", (done) => {
        metricsCtrl.getTotalTokens({lastModified: 0}, function (err, res) {
            expect(err).to.not.exist;
            return done();
        });
    });
});