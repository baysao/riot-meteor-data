Package.describe({
  name: "baysao:riot-meteor-data",
  summary: "Riotjs mixin for reactively tracking Meteor data",
<<<<<<< HEAD
  version: '0.1.0-2',
=======
  version: '0.1.0-1',
>>>>>>> f96a5efc7cd9e093704004cdaf4348a66c32b1af
  documentation: 'README.md',
  git: 'https://github.com/baysao/riot-meteor-data.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.1.0.2');
  api.use('tracker');
  api.use('baysao:riotjs@2.2.4-1', ['client', 'server']);
  api.use('jsx@0.1.6');

  api.export(['RiotMeteorData']);

  api.addFiles('meteor-data-mixin.jsx');
});

