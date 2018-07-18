

/*
 * Copyright vdeapps
 */

class vdeappsScanInterval extends vdeappsAddonAbstract {
    
    constructor() {
        super();
        this.setName('scanInterval');
        
        this.status = {
            "IDLE": 1,
            "RUN": 2,
            "STOP": 0
        }
        
        this.options = {
            status: this.status.STOP,
            callback: null,
            id: null,
            loop: 0,
            currentLoop: 0,
            autorun: false
        }
        
        /*
        * jobname:{
        * interval: 2000,
        * status: this.status.STOP,
        * callback: null,
        * id: null, // from setInterval
        * loop: 0 //0:infinite loop
        * }
        */
        this.joblist = {}
        
    }
    
    static status() {
        return {
            IDLE: 1,
            RUN: 2,
            STOP: 0
        }
    }
    
    /*
     * Add new job
     */
    add(jobname, options) {
        if (typeof this.joblist[jobname]) {
            this.stop(jobname).remove(jobname)
        }
        
        var mergeoptions = merge({}, this.options, options);
        
        this.joblist[jobname] = mergeoptions;
        this.joblist[jobname].status = this.status.STOP;
        
        if (this.joblist[jobname].autorun == true) {
            this.run(jobname);
        }
        
        return this
    }
    
    /**
     * delete a job
     */
    remove(jobname) {
        try {
            delete this.joblist[jobname]
        }
        catch (e) {
        }
        return this
    }
    
    /**
     * run a job
     */
    run(jobname) {
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
                        console.log("STOP " + jobname)
                        // that.joblist[jobname].status = that.status.STOP
                        that.stop(jobname);
                    }
                    else {
                        /*
                         * Don't run if job already RUN
                         */
                        if (that.joblist[jobname].status == that.status.RUN) {
                            console.info("already run")
                            return
                        }
                        else {
                            that.joblist[jobname].currentLoop += 1;
                        }
                        
                        console.info(jobname + " current Loop=" + that.joblist[jobname].currentLoop)
                        
                        that.joblist[jobname].status = that.status.STOP
                        that.joblist[jobname].callback.apply()
                        that.joblist[jobname].status = that.status.IDLE
                    }
                }, this.joblist[jobname].interval);
            }
        }
        catch (e) {
        
        }
        return this
    }
    
    /**
     * run a job
     */
    stop(jobname) {
        try {
            if (typeof this.joblist[jobname] != 'undefined') {
                window.clearInterval(this.joblist[jobname].id)
                this.joblist[jobname].id = null
                this.joblist[jobname].status = this.status.STOP
            }
        }
        catch (e) {
        }
        return this
    }
    
    /**
     * stop all jobs
     */
    stopall() {
        for (var job in this.joblist) {
            this.stop(job)
        }
    }
    
    /**
     * run all jobs
     */
    runall() {
        for (var job in this.joblist) {
            this.run(job)
        }
    }
    
    /*
     * Return array of jobs by status
     */
    getjobs(status) {
        var jobsname = [];
        for (var job in this.joblist) {
            if (this.joblist[job].status == status) {
                jobsname.push(job);
            }
        }
        return jobsname;
    }
}