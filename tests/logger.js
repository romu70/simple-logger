'use strict';

const test = require('tape');
const fs = require('fs');
const path = require('path');
const logger = require("../src/logger.js");

//TODO: if initialized, a second init call must raise an exception

test("Logger opening/closing", function (t) {
    t.plan(11);

    t.equal(false, logger.isInitialized(), "logger is not initialized at first time");
    t.throws(logger.init, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(null); }, null, "logger init doesn't accept null or empty");
    t.throws(function() { logger.init(3); }, null, "logger file path must be a string");
    t.throws(function() { logger.init("/titi/toto/tutu"); }, null, "logger file path must exist");
    t.throws(function() { logger.init("/should-not-work.log"); }, null, "logger file path must be writable");
    t.doesNotThrow(function() { logger.init("./should-work.log"); }, null, "this should pass");
    t.assert(logger.isInitialized(), "logger must be initialized");
    t.throws(function() { logger.init("./should-not-work.log"); }, null, "logger can be initialized only once");
    t.doesNotThrow(function() { logger.close(); }, null, "this should pass");
    t.equal(false, logger.isInitialized(), "logger is not initialized after closing");
});