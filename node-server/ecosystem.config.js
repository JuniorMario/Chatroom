module.exports = {
  apps: [{
    name: 'Chatroom',
    script: './app.js',
    args: [
      '--color',
    ],
    node_args: [
      '--inspect=0.0.0.0:9229',
    ],
    watch: [
      '.',
      'ecosystem.config.js',
      'package.json',
    ],
    ignore_watch: [
      'node_modules',
      'docker',
    ],
  }],
};
