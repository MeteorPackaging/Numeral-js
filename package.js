// package metadata file for Meteor.js
var packageName = 'numeral:numeral'; // https://atmospherejs.com/numeral/numeral
var where = ''; // where to install: 'client' or 'server'. For both, pass nothing.
var version = "1.5.3";

Package.describe({
  "name": packageName,
  "summary": 'Numeral.js (official) - formatting and manipulating numbers.',
  "version": version,
  "git": 'https://github.com/adamwdraper/Numeral-js.git'
});

Npm.depends({
  "numeral": version
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0']);
  api.export('numeral');
  api.addFiles([
      'numeral.js',
      'min/languages.min.js',
      'meteor/export.js'
    ], where
  );
});

Package.onTest(function (api) {
  api.use(packageName, where);
  api.use('tinytest', where);
  api.addFiles('meteor/export-test.js', where);
});