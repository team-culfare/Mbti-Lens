module.exports = {
    apps: [
        {
            name: "mbti.lens.front",
            script: "node_modules/next/dist/bin/next",
            args: "start -p 3000",
            cwd: "./",
            instances: 0,
            autorestart: true,
            listen_timeout: 50000,
            kill_timeout: 5000,
        },
    ],
};
