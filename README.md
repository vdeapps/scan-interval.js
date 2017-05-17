# scan-nterval.js
Manage javascript multiple setInterval

# Bower installation
bower install vdeapps/scan-interval.js --save

# Usage
<script type="text/javascript" src="/bower_components/merge.js/dist/merge.js"></script>
<script type="text/javascript" src="/bower_components/vdeapps.js/dist/vdeapps.js"></script>
<script type="text/javascript" src="/bower_components/scan-interval.js/dist/scan-interval.js"></script>

(function() {
vdeapps.init()

vdeapps.get('scan-interval').add('job1',{
        "interval": 5000,
        "autorun": false,
        "callback": function(){
                $('#container').append("job1 called");
            }
    });

vdeapps.get('scan-interval').run('job1')

vdeapps.get('scan-interval').runall()

vdeapps.get('scan-interval').stopall()

// Return an array of jobname with the RUN status
vdeapps.get('scan-interval').getjobs(vdeapps.get('scan-interval').status.RUN)

// Return an array of jobname with the IDLE status
vdeapps.get('scan-interval').getjobs(vdeapps.get('scan-interval').status.IDLE)

// Return an array of jobname with the STOP status
vdeapps.get('scan-interval').getjobs(vdeapps.get('scan-interval').status.STOP)

// Return an array of jobname with the RUN status
vdeapps.get('scan-interval').remove('job1')
})
