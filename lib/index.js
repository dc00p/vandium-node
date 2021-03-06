'use strict';

const Vandium = require( './vandium' );

const singleton = require( './singleton_instance' );

const LambdaProxy = require( './lambda_proxy' );

function getInstance() {

    return singleton.get();
}

function vandium( userFunc ) {

	let handler = getInstance().handler( userFunc );

    // any further calls to vandium.xxxxxx() will not be capture by our handler
    singleton.reset();

    return handler;
}

vandium.after = function( afterHandlerFunction ) {

    getInstance().after( afterHandlerFunction );
}

vandium.validation = function( schema ) {

	if( schema ) {

        getInstance().validation.setSchema( schema );
	}

    return getInstance().validation;
}

// allow jwt to be used as a member variable or method
vandium.jwt = function() {

    return getInstance().jwt;
}

vandium.jwt.configure = function( options ) {

    return getInstance().jwt.configure( options );
}

vandium.jwt.enable = function( enable ) {

    return getInstance().jwt.configure( { enable } );
}

vandium.logUncaughtExceptions = function( enable ) {

    getInstance().logUncaughtExceptions = (enable !== false);
}

vandium.stripErrors = function( enable ) {

    getInstance().stripErrors = (enable !== false);
}

vandium.callbackWaitsForEmptyEventLoop = function( enable ) {

    getInstance().callbackWaitsForEmptyEventLoop = (enable !== false );
}

vandium.createInstance = function( config ) {

    return new Vandium( config );
}

Object.defineProperty( vandium, 'protect', {

    get: function() {

        return getInstance().protect;
    }
});

Object.defineProperty( vandium, 'types', {

	get: function() {

		return Vandium.types;
	}
});

Object.defineProperty( vandium, 'validator', {

    get: function() {

        return getInstance().validation.validator;
    }
});

vandium.LambdaProxy = LambdaProxy;

module.exports = vandium;
