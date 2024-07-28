module.exports = {
    apps : [{
        exec_mode: 'cluster',
        name   : "White",
        script : "./dist/src/index.js",
        log: './logs/combined.log',
        error_file : "./logs/error.log",
        out_file : "./logs/out.log",
        combine_logs:true,
        autorestart:true,
        time: true,
        env_prod:{
            NODE_ENV:"prod",
            TOKEN:"",
            BOT_ID:'',
        },
        ignore_watch: [
            'node_modules',
            'logs',
            '.git',
        ],
        watch_options: {
            "followSymlinks": false,
            "usePolling": true
        }
    }]
}
  
  
