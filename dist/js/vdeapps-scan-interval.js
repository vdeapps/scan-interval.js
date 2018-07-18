"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright vdeapps
 */

var scanInterval = function (_vdeappsAddonAbstract) {
    _inherits(scanInterval, _vdeappsAddonAbstract);

    function scanInterval() {
        _classCallCheck(this, scanInterval);

        var _this = _possibleConstructorReturn(this, (scanInterval.__proto__ || Object.getPrototypeOf(scanInterval)).call(this));

        _this.setName('scanInterval');

        _this.status = {
            "IDLE": 1,
            "RUN": 2,
            "STOP": 0
        };

        _this.options = {
            status: _this.status.STOP,
            callback: null,
            id: null,
            loop: 0,
            currentLoop: 0,
            autorun: false

            /*
            * jobname:{
            * interval: 2000,
            * status: this.status.STOP,
            * callback: null,
            * id: null, // from setInterval
            * loop: 0 //0:infinite loop
            * }
            */
        };_this.joblist = {};

        return _this;
    }

    _createClass(scanInterval, [{
        key: "add",


        /*
         * Add new job
         */
        value: function add(jobname, options) {
            if (_typeof(this.joblist[jobname])) {
                this.stop(jobname).remove(jobname);
            }

            var mergeoptions = merge({}, this.options, options);

            this.joblist[jobname] = mergeoptions;
            this.joblist[jobname].status = this.status.STOP;

            if (this.joblist[jobname].autorun == true) {
                this.run(jobname);
            }

            return this;
        }

        /**
         * delete a job
         */

    }, {
        key: "remove",
        value: function remove(jobname) {
            try {
                delete this.joblist[jobname];
            } catch (e) {}
            return this;
        }

        /**
         * run a job
         */

    }, {
        key: "run",
        value: function run(jobname) {
            var that = this;
            try {
                if (this.joblist[jobname].id == null) {

                    // Run action at start
                    that.joblist[jobname].status = that.status.STOP;
                    that.joblist[jobname].callback.apply();
                    that.joblist[jobname].status = that.status.IDLE;
                    that.joblist[jobname].currentLoop += 1;

                    this.joblist[jobname].id = window.setInterval(function () {

                        // Test number of loop
                        if (that.joblist[jobname].loop != 0 && that.joblist[jobname].currentLoop == that.joblist[jobname].loop) {
                            console.log("STOP " + jobname);
                            // that.joblist[jobname].status = that.status.STOP
                            that.stop(jobname);
                        } else {
                            /*
                             * Don't run if job already RUN
                             */
                            if (that.joblist[jobname].status == that.status.RUN) {
                                console.info("already run");
                                return;
                            } else {
                                that.joblist[jobname].currentLoop += 1;
                            }

                            console.info(jobname + " current Loop=" + that.joblist[jobname].currentLoop);

                            that.joblist[jobname].status = that.status.STOP;
                            that.joblist[jobname].callback.apply();
                            that.joblist[jobname].status = that.status.IDLE;
                        }
                    }, this.joblist[jobname].interval);
                }
            } catch (e) {}
            return this;
        }

        /**
         * run a job
         */

    }, {
        key: "stop",
        value: function stop(jobname) {
            try {
                if (typeof this.joblist[jobname] != 'undefined') {
                    window.clearInterval(this.joblist[jobname].id);
                    this.joblist[jobname].id = null;
                    this.joblist[jobname].status = this.status.STOP;
                }
            } catch (e) {}
            return this;
        }

        /**
         * stop all jobs
         */

    }, {
        key: "stopall",
        value: function stopall() {
            for (var job in this.joblist) {
                this.stop(job);
            }
        }

        /**
         * run all jobs
         */

    }, {
        key: "runall",
        value: function runall() {
            for (var job in this.joblist) {
                this.run(job);
            }
        }

        /*
         * Return array of jobs by status
         */

    }, {
        key: "getjobs",
        value: function getjobs(status) {
            var jobsname = [];
            for (var job in this.joblist) {
                if (this.joblist[job].status == status) {
                    jobsname.push(job);
                }
            }
            return jobsname;
        }
    }], [{
        key: "status",
        value: function status() {
            return {
                IDLE: 1,
                RUN: 2,
                STOP: 0
            };
        }
    }]);

    return scanInterval;
}(vdeappsAddonAbstract);