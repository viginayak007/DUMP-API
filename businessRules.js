(function executeRule(current, previous /*null when async*/) {
	var body = current;
	var request = new sn_ws.RESTMessageV2();
	request.setEndpoint('https://salty-lowlands-97604.herokuapp.com/incident');
	request.setHttpMethod('POST');
	request.setRequestBody(body);
	
	var response = request.execute();
	gs.log(response.getStatusCode());
	

})(current, previous);