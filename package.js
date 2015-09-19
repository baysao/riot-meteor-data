Package.describe({
  name: "baysao:riot-meteor-data",
  summary: "Riotjs mixin for reactively tracking Meteor data",
  version: '0.1.0',
  documentation: 'README.md',
  git: 'https://github.com/baysao/riot-meteor-data.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.1.0.2');
  api.use('tracker');
  api.use('baysao:riotjs', ['client', 'server']);
  api.use('jsx@0.2.1');

  api.export(['RiotMeteorData']);

  api.addFiles('meteor-data-mixin.jsx');
});

