/**
* Manage job interval
*/

try {
  if (vdeapps.obj.scanInterval == undefined){
    throw new Error("vdeapps/vdeapps.js not loaded");
  }
  
  vdeapps.obj.scanInterval = {
    /*
    * Job status
    */
    status:{
      "RUN": 1,
      "STOP": 0
    },
    
    /*
    * Job list
    */
    listJob: {
      /*
      "jobname":{
        "interval": 2000,
        "status": this.status.STOP,
        "id": null, // from setInterval
        "loop": 0 //0:infinite loop
      }
      */
    },
    
    /*
    * Constructor: Called by vdeapps.js
    */
    init: function () {
      //
    }
    
    /*
    * Add new job
    */
    ,add: function(jobname, callback){
    }
    
    ,remove: functionb(jobname){
    }
  
    ,run: function(jobname){
    }
  
    ,stop: function(jobname){
    }
}
catch(e) {
  alert(e.message())
}
