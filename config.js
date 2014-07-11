/**
 * Master library for calling REST endpoints in OpenIDM for configuration editor extension - (C) Simon Moffatt 2014 
 */

//Gets Configuration ///////////////////////////////////////////////////////////////////////////////////////////////////////
//obj = name of object that is to be set;
function getConfig(obj) {
	
    var xmlHttp = null;
    url = "/openidm/config/" + obj;
    
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    
    return xmlHttp.responseText;

}


//Sets Configuration ///////////////////////////////////////////////////////////////////////////////////////////////////////
//obj = name of object that is to be set; data = JSON payload 
function setConfig(obj,data) {
	
	  var xmlHttp = null;
	  url = "/openidm/config/" + obj;
	  
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "PUT", url, false );
	  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	  xmlHttp.setRequestHeader("X-Requested-With", "OpenIDM Plugin");
	  xmlHttp.send(data);
	  
	  return xmlHttp.responseText;
	
}

//Global var for use when calling connector config
var connectorList;

//Retrieves the base connector configuration listing
function getConnectorList() {
	
	  var xmlHttp = null;
	  url = "/openidm/system?_action=CREATECONFIGURATION";
	  
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "POST", url, false );
	  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	  xmlHttp.setRequestHeader("X-Requested-With", "OpenIDM Plugin");
	  xmlHttp.send( null );
	  
	  //Response object of all connectors installed on system
	  connectorList = JSON.parse(xmlHttp.responseText);
	 
	  //Dynamically update the select HTML with the necessary values
	  var connectSelectHTML = "<option value=\"default\" selected>--- Select A Template Connector ---</option>";
		  
	  for (i=0; i < connectorList["connectorRef"].length;  i++)  {
		  
		 connectSelectHTML += "<option value=\"" + i + "\">" + connectorList["connectorRef"][i]["displayName"] + "</option>";
		  
	  }
	
	  return connectSelectHTML;
}

//Retrieves the current list of all configuration objects and auto populates the select option
function getConfigList() {
	
	  var xmlHttp = null;
	  url = "/openidm/config/";
	  
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "GET", url, false );
	  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	  xmlHttp.setRequestHeader("X-Requested-With", "OpenIDM Plugin");
	  xmlHttp.send( null );
	  
	  //Response object of all connectors installed on system
	  configList = JSON.parse(xmlHttp.responseText);
	 
	  //Dynamically update the select HTML with the necessary values
	  var configSelectHTML = "<option value=\"default\" selected>--- Select A Configuration Object ---</option>";
		  
	  for (i=0; i < configList["configurations"].length;  i++)  {
		  
		 configSelectHTML += "<option value=\"" + configList["configurations"][i]["_id"] + "\">" + configList["configurations"][i]["_id"] + "</option>";
		  
	  }
	
	  return configSelectHTML;
}


//Retrieves specific connector configuration template
function getConnectorConfig(selectedConnectorIndex) {
	
	  var xmlHttp = null;
	  url = "/openidm/system?_action=CREATECONFIGURATION";
	  
	  //Retrieve the connector template object
	  var connectorObj = connectorList["connectorRef"][selectedConnectorIndex];
	  
	  //Build object to send to OpenIDM
	  var payload = {"connectorRef": connectorObj};
	  
	  //Build Request stuff
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "POST", url, false );
	  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	  xmlHttp.setRequestHeader("X-Requested-With", "OpenIDM Plugin");
	  xmlHttp.send( JSON.stringify(payload) );
	  
	  //Response object with connector attributes
	  var connectorConfig = JSON.parse(xmlHttp.responseText);
	  return connectorConfig;
	  
}

//Perform basic JSON syntax (not schema) validation
function validateJSON(data){
	
	var response = "";
	try {
	        data = JSON.parse(data);
	        response = "Syntax OK!"
	}
	//Syntax Error
	catch(e){
	      
	        response = e //+ "at line: "+ e.lineNumber; lineNumber only works on FF not Chrome...ce
	}

	return response;
	
}

//Creates Connector
function verifyConnector(connectorObj) {
	
	  var xmlHttp = null;
	  url = "/openidm/system?_action=CREATECONFIGURATION";
	    	  
	  //Build Request stuff
	  xmlHttp = new XMLHttpRequest();
	  xmlHttp.open( "POST", url, false );
	  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	  xmlHttp.setRequestHeader("X-Requested-With", "OpenIDM Plugin");
	  xmlHttp.send( JSON.stringify(connectorObj) );
	  
	  //Response object with connector attributes
	  var createConnectorResponse = JSON.parse(xmlHttp.responseText);
	  return createConnectorResponse;
}