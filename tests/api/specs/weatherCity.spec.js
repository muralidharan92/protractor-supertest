let supertest = require("supertest");
var chai = require("chai");
let config = require('../helpers/config.json');
let utils = require('../helpers/utils.js');
let bodies = require('../helpers/weather.bodies.js');
var should = chai.should();

var server = supertest.agent(config.URLBase);

describe("/GET", function () {
    it("200 - the weather information by London - City Name", function (done) {
        server
            .get(config.URLNameCity + utils.apiID.id)
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.id.should.equal(bodies.lodonCity.id);
                res.body.name.should.equal(bodies.lodonCity.name);
                res.body.cod.should.equal(bodies.lodonCity.cod);
                res.body.coord.lon.should.equal(bodies.lodonCityCoord.lon);
                res.body.coord.lat.should.equal(bodies.lodonCityCoord.lat);
                res.body.weather.should.to.be.an('array');
                res.body.main.should.to.be.an('object');
                res.body.wind.should.to.be.an('object');
                res.body.clouds.should.to.be.an('object');
                res.body.sys.should.to.be.an('object');
                done();
            });
    });

    it("200 - the weather information by London - City ID", function (done) {
        server
            .get(config.URLNameCity + utils.apiID.id)
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.id.should.equal(bodies.lodonCity.id);
                res.body.name.should.equal(bodies.lodonCity.name);
                res.body.cod.should.equal(bodies.lodonCity.cod);
                res.body.coord.lon.should.equal(bodies.lodonCityCoord.lon);
                res.body.coord.lat.should.equal(bodies.lodonCityCoord.lat);
                res.body.weather.should.to.be.an('array');
                res.body.main.should.to.be.an('object');
                res.body.wind.should.to.be.an('object');
                res.body.clouds.should.to.be.an('object');
                res.body.sys.should.to.be.an('object');
                done();
            });
    });

    it("401 - Unauthorized to get by city", function (done) {
        server
            .get(config.URLNameCity)
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(401);
                res.body.cod.should.equal(bodies.unauthorized.cod);
                res.body.message.should.equal(bodies.unauthorized.message);
                done();
            });
    });

    it("404 - Not found to city", function (done) {
        server
            .get(config.URLNameCityInvalid + utils.apiID.id)
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                res.body.cod.should.equal(bodies.notFoundCity.cod);
                res.body.message.should.equal(bodies.notFoundCity.message);
                done();
            });
    });
});
