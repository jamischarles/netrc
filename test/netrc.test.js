/**
 * Module dependencies
 */
var netrc = require("..")
  , should = require("should")
  , fs = require("fs");

var valid = fs.readFileSync(__dirname+"/fixtures/netrc-valid", "utf-8")
  , invalid = fs.readFileSync(__dirname+"/fixtures/netrc-invalid", "utf-8");

describe("netrc", function() {

  describe("read", function() {
    it("should parse a valid file", function() {
      var machines = netrc(__dirname+"/fixtures/netrc-valid");
      should.exist(machines);
      machines.should.have.property("github.com");
      machines["github.com"].should.have.property("login");
      machines["github.com"].login.should.eql("CamShaft");
      machines["github.com"].should.have.property("password");
      machines["github.com"].password.should.eql("123");
    });

    it("should not parse an invalid string", function() {
      var machines = netrc(__dirname+"/fixtures/netrc-invalid");
      should.exist(machines);
      Object.keys(machines).length.should.eql(0);
    });
  });

  describe("parse", function() {
    it("should parse a valid string", function() {
      var machines = netrc.parse(valid);
      should.exist(machines);
      machines.should.have.property("github.com");
      machines["github.com"].should.have.property("login");
      machines["github.com"].login.should.eql("CamShaft");
      machines["github.com"].should.have.property("password");
      machines["github.com"].password.should.eql("123");
    });

    it("should not parse an invalid string", function() {
      var machines = netrc.parse(invalid);
      should.exist(machines);
      Object.keys(machines).length.should.eql(0);
    });
  });

});