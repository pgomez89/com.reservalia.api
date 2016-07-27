"use strict";

const debug = require("debug")("api:tests:lib:metricsDBTest");

const metricsDB = require("../../lib/metricsDB.js");

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
describe("metricsDB", () => {

    it.skip("Deberia traer todos los intentos de la db", (done) => {
        metricsDB.getTotalAttemps({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer todos los intentos de hoy", (done) => {
        metricsDB.getTotalAttemps({lastModified: 0},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer todas las ventas ok de la db", (done) => {
        metricsDB.getSalesOk({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('oneShot');
            expect(res).to.have.property('extraSteps');
            return done();
        });
    });

    it.skip("Deberia traer todas las ventas ok de hoy", (done) => {
        metricsDB.getSalesOk({lastModified: 0}, function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('oneShot');
            expect(res).to.have.property('extraSteps');
            return done();
        });
    });

    //En el panel anterior no se usa.
    it.skip("Deberia traer todas las ventas ok de la db con Extra Steps", (done) => {
        metricsDB.getSalesOkWithError(function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer todas las ventas ok de la db con BOOKING_STATUS", (done) => {
        metricsDB.getSalesOkByBookingStatusError({},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

    it.skip("Deberia traer todas las ventas ok de la db con BOOKING_STATUS de hoy", (done) => {
        metricsDB.getSalesOkByBookingStatusError({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

    //En el panel anterior no se usa.
    it.skip("Deber traer el total con BOOKING_STATUS", (done) => {
        metricsDB.getTotalForBookingStatus(function(err,res){
            console.log(err,res);
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    //Errors

    it.skip("Deberia traer los errores con BOOKING_STATUS de toda la db", (done) => {
        metricsDB.getCheckoutWithError({},function(err,res){
            expect(err).to.not.exist;
            expect(res[0]).to.have.all.keys(['_id','count']);
            return done();
        });
    });

    it.skip("Deberia traer los errores con BOOKING_STATUS de hoy", (done) => {
        metricsDB.getCheckoutWithError({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

    it.skip("Deberia traer la cantidad de ventas fallidas con BOOKING_STATUS de toda las db", (done) => {
        metricsDB.getTotalCheckoutWithError({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    //En el panel anterior no se usa.
    it.skip("Deberia traer la cantidad de ventas fallidas con BOOKING_STATUS de hoy", (done) => {
        metricsDB.getTotalCheckoutWithError({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });


    it.skip("Deberia traer la cantidad de ventas fallidas sin BOOKING_STATUS de toda la db", (done) => {
        metricsDB.getCheckoutWithoutBookingStatus({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer la cantidad de ventas fallidas sin BOOKING_STATUS de hoy", (done) => {
        metricsDB.getCheckoutWithoutBookingStatus({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

    it.skip("Deberia traer los tokens expirados de toda la db", (done) =>{
        metricsDB.getExpiredTokens({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer los tokens expirados de hoy", (done) =>{
        metricsDB.getExpiredTokens({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

    //En el panel anterior no se usa.
    it.skip("Deberia traer la cantidad de errores por booking_id de toda la db", (done) =>{
        metricsDB.getTotalErrorsByCheckout({},function(err,res){
            expect(err).to.not.exist;
            expect(res).to.have.property('count');
            return done();
        });
    });

    it.skip("Deberia traer la cantidad de errores por booking_id de hoy", (done) =>{
        metricsDB.getTotalErrorsByCheckout({lastModified:0},function(err,res){
            expect(err).to.not.exist;
            return done();
        });
    });

});