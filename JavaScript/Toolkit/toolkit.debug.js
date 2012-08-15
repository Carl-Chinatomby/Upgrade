/*
toolkit.debug.js

Debugging tools such as logging.
*/
if (typeof toolkit == 'undefined'){
	toolkit = function(){}
}

toolkit.debug = function() {}

/*
Logger that sends output to a div
*/
toolkit.debug.DivLogger = function() {
	//ENUMS
	//MAKE THIS AN ARRAY/OBJECT SO WE CAN LOOP THROUGH THIS AND REMOVE COPY + PASTE BELOW
	this.LEVEL_TRACE = 1;
	this.LEVEL_DEBUG = 2;
	this.LEVEL_INFO = 3;
	this.LEVEL_WARN = 4;
	this.LEVEL_ERROR = 5;
	this.LEVEL_FATAL = 6;
	
	//Font Colors
	this.LEVEL_TRACE_COLOR = "a0a000";
	this.LEVEL_DEBUG_COLOR = "64c864";
	this.LEVEL_INFO_COLOR = "000000";
	this.LEVEL_WARN_COLOR = "0000ff";
	this.LEVEL_ERROR_COLOR = "ff8c00";
	this.LEVEL_FATAL_COLOR = "ff0000";
	
	//determines the default minimum log level to show
	this.logLevel = this.LEVEL_INFO;
	
	//target div initalization
	this.targetDiv = null;
	
	//set the loglevel, must be a valid log level
	this.setLevel = function(inLevel){
		this.logLevel = inLevel
	}
	
	//set the target div
	this.setTargetDiv = function(inTargetDive){
		this.targetDiv = inTargetDiv;
		this.targetDiv.innerHTML = "";
	}
	
	//helper function to determine if the current statement meets the log level
	this.shouldBeLogged = function(inLevel) {
		if (inLevel >= this.logLevel){
			return true;
		} else {
			return false;
		}
	}
	
	//LOGGING FUNCTIONS FOR EACH LEVEL
	//ALOT OF COPYING AND PASTE HERE, IS THERE A WAY WE CAN SIMPLIFY THIS?
	//Maybe a loop with all of these declarations and the name of the corresponding fct?
	this.trace = function(inMessage) {
		if (this.shouldBeLogged(this.LEVEL_TRACE) && this.targetDiv){
			this.targetDiv.innerHTML +=
			"<div style='color:#" + this.LEVEL_TRACE_COLOR + ";'>" + "[TRACE] " + inMessage + "</div>"
		}
	}
	
	this.debug = function(inMessage) {
		if (this.shouldBeLogged(this.LEVEL_DEBUG) && this.targetDiv){
			this.targetDiv.innerHTML +=
			"<div style='color:#" + this.LEVEL_DEBUG_COLOR + ";'>" + "[DEBUG] " + inMessage + "</div>";
		}
	}
	
	this.info = function(inMessage){
		if (this.shouldBeLogged(this.LEVEL_INFO) && this.targetDiv){
			this.targetDiv.innerHTML +=
			"<div style='color:#" + div.LEVEL_INFO_COLOR + ";'>" + "[INFO] " + inMessage + "</div>";
		}
	}
	
	this.warn = function(inMessage) {
		if (this.shouldBeLogged(this.LEVEL_WARN) && this.targetDiv){
			this.targetDiv.innerHTML += 
			"div style='color:#" + div.LEVEL_WARN_COLOR + ";'>" + "[WARN] " + inMessage + "</div>";
		}
	}
	
	this.error = function(inMessage) {
		if (this.shouldBeLogged(this.LEVEL_ERROR) && this.targetDiv) {
			this.targetDiv.innerHTML +=
			"<div style='color:#" + this.LEVEL_ERROR_COLOR + ";'>" + "[ERROR] " + inMessage + "</div>"
		}
	}
	
	this.fatal = function(inMessage) {
		if (this.shouldBeLogged(this.LEVEL_FATAL) && this.targetDiv) {
			this.targetDiv.innerHTML +=
			"<div style='color:#" + this.LEVEL_FATAL_COLOR + ";'>" + "[FATAL] " + inMessage + "</div>";
		}
	}
}

//Enumerates through all the properties of an object
toolkit.debug.enumProps = function(inObj) {
	var props = "";
	var i;
	for (i in inObj){
		props += i = " = " + inObj[i] + "\n";
	}
	alert(props);
}