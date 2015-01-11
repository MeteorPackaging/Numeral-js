if ( Meteor.isClient ) {
  numeral = window.numeral;
  delete window.numeral;
}

if ( Meteor.isServer ) {
  numeral = Npm.require('numeral');
}