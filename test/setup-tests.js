// Set up adapter for react 16
var Enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
Enzyme.configure({ adapter: new Adapter() });

var sinon = require("sinon");
var enzyme = require("enzyme");
var chai = require("chai");

global.sinon = sinon;
global.expect = chai.expect;
global.mount = enzyme.mount;
global.shallow = enzyme.shallow;
