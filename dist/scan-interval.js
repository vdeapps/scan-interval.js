/**
 * Manage job interval
 */

try {
	if (vdeapps == undefined) {
		throw new Error("vdeapps/vdeapps.js not loaded");
	}

	vdeapps.load('scan-interval', {
		/*
		 * status
		 */
		status : {
			"IDLE" : 1,
			"RUN" : 2,
			"STOP" : 0
		}
	
		/*
		 * default options
		 */
		,
		options:{
			"status": this.status.STOP,
			"callback": null,
			"id": null,
			"loop": 0,
			"current-loop":0,
			"autorun": false
		}

		/*
		 * Job list
		 */
		,
		joblist : {
		/*
		 * "jobname":{ 
		 * "interval": 2000, 
		 * "status": this.status.STOP,
		 * "callback": null, 
		 * "id": null, // from setInterval
		 * "loop": 0 //0:infinite loop 
		 * }
		 */
		}

		/*
		 * Constructor: Called by vdeapps.js
		 */
		,
		init : function() {

		}

		/*
		 * Add new job
		 */
		,
		add : function(jobname, options) {
			if (typeof this.joblist[jobname]){
				this.stop(jobname).remove(jobname)
			}
			
			var mergeoptions = merge({},this.options, options)
			
			this.joblist[jobname]=mergeoptions;
			this.joblist[jobname].status = this.status.STOP
			
			if (this.joblist[jobname].autorun==true){
				this.run(jobname)
			}
			
			return this
		}

		/**
		 * delete a job
		 */
		,
		remove : function(jobname) {
			try{
				delete this.joblist[jobname]
			}
			catch (e){}
			return this
		}

		/**
		 * run a job
		 */
		,
		run : function(jobname) {
			var that = this;
			try{
				if (this.joblist[jobname].id == null){
					
					// Run action at start
					that.joblist[jobname].status = that.status.STOP;
					that.joblist[jobname].callback.apply();
					that.joblist[jobname].status = that.status.IDLE;
					
					this.joblist[jobname].id = setInterval(function(){
						
						/*
						 * Don't run if job already RUN
						 */
						if (that.joblist[jobname].status == that.status.RUN){
							console.info("already run")
							return
						}
						
						that.joblist[jobname].status = that.status.STOP
						that.joblist[jobname].callback.apply()
						that.joblist[jobname].status = that.status.IDLE
						
					}, this.joblist[jobname].interval );
				}
			}
			catch (e) {
				
			}
			return this
		}

		/**
		 * run a job
		 */
		,
		stop : function(jobname) {
			try{
				if (typeof this.joblist[jobname]!='undefined'){
					clearInterval(this.joblist[jobname].id)
					this.joblist[jobname].id = null
					this.joblist[jobname].status = this.status.STOP
				}
			}
			catch (e){}
			return this
		}
		
		/**
		 * stop all jobs
		 */
		,
		stopall: function(){
			for (var job in this.joblist) {
				this.stop(job)
			}
		}
		
		/**
		 * run all jobs
		 */
		,
		runall: function(){
			for (var job in this.joblist) {
				this.run(job)
			}
		}
		
		/*
		 * Return array of jobs by status
		 */
		,getjobs: function(status){
			var jobsname = [];
			for (var job in this.joblist) {
				if (this.joblist[job].status == status)
				{
					jobsname.push(job);
				}
			}
			return jobsname;
		}
	});
	
} 
catch (e) {
	console.error(e.message)
};



