
//--------

var f = function(a) {
	return function(b) {
	return(a + b);
	}
};

//--------


var f2 = function(stringInput) {
	
	function objCreate(obj,path,length,val,i) {
		if (length === i) { 
			return obj;
		} else {
		let name = path[i];
		if (obj.hasOwnProperty(name) === false) {
			obj[name] = {};
		}; 
		if (length -1 === i) {
			obj[name] = val
		};
		return objCreate(obj[name],path,length,val,++i);
		}
	}

	let object = {};	
	let masWrld = stringInput.split('=');
	if ((masWrld.length >= 2) && (masWrld[0] !== '') && (masWrld[1] !== '')) {
		let masPath = masWrld[0].trim();
		masWrld = masWrld.slice(1);
		let masVal = masWrld.join(' ').trim();
		masVal = ((masVal.indexOf('"') === 0) && (masVal.lastIndexOf('"') === masVal.length-1)) ?
			masVal.substring(1,masVal.length-1) : masVal;
	//	if ((masVal.indexOf('"') === 0) && (masVal.lastIndexOf('"') === masVal.length-1)) {masVal = masVal.substring(1,masVal.length-1)};
		let masPathElem = masPath.split(".");
		objCreate(object,masPathElem,masPathElem.length,masVal,0);
	};
	return object;	
};

//--------

var f3 = function(stringInput) {
	
	function objCreate(obj,path,length,val,i) { 
		if (length === i) { 
			return obj; 
		} else {
		let name = path[i]; 
		if (obj.hasOwnProperty(name) === false) { 
		obj[name] = {}; 
		}; 
		if (length -1 === i) { 
			obj[name] = val 
		};
		return objCreate(obj[name],path,length,val,++i); 
		}
	}
	
	let j = 0; 
	let object = {};	
	let masStr = stringInput.split("&"); 
	for (j; j<=masStr.length-1; j++) { 
		let masWrld = masStr[j].split("="); 
		if ((masWrld.length >= 2) && (masWrld[0] !== '') && (masWrld[1] !== '')) { 
			let masPathElem = masWrld[0].trim().split("."); 
			masWrld = masWrld.slice(1); 
			let masVal = masWrld.join(' ').trim(); 
			
			masVal = ((masVal.indexOf('"') === 0) && (masVal.lastIndexOf('"') === masVal.length-1)) ?
				masVal.substring(1,masVal.length-1) : masVal; 
			if (masVal !== '') {objCreate(object,masPathElem,masPathElem.length,masVal,0)};
		};
	}
	return object;	
};


//------

var f2Mod = function(stringInput) {
	
	function objCreate(obj,path,length,val,i) {
		if (length === i) { 
			return obj;
		} else {
		let name = path[i];
		if (obj.hasOwnProperty(name) === false) {
			obj[name] = {};
		}; 
		if (length -1 === i) {
			obj[name] = val
		};
		return objCreate(obj[name],path,length,val,++i);
		}
	}
	
	let object = {};	
	let masPathVal = stringInput.match(/(.?\w+)+?=/); 
	let masVal = stringInput.match(/=(.+)/);  
	if ((masPathVal !== null) && (masVal !== null)) {
		let masPath = masPathVal[0].slice(0,-1).match(/[^\s.]+/gi);
		masVal = masVal[0].slice(1).replace(/=/g,' ');
		masVal = ((masVal.trim().indexOf('"') === 0) && (masVal.trim().lastIndexOf('"') === masVal.trim().length-1)) ?
			masVal.trim().substring(1,masVal.trim().length-1) : masVal.trim();
		objCreate(object,masPath,masPath.length,masVal,0);
	};
	return object;	
};

//------

var f3Mod = function(stringInput) {
	
	function objCreate(obj,path,length,val,i) {  
		if (length === i) { 
			return obj; 
		} else {
		let name = path[i]; 
		if (obj.hasOwnProperty(name) === false) { 
		obj[name] = {}; 
		}; 
		if (length -1 === i) { 
			obj[name] = val 
		};
		return objCreate(obj[name],path,length,val,++i); 
		}
	}
	
	let j = 0;
	let object = {};	
	const patternF = /[^\s&]+/gi;  
	const patternS = /(.?\w+)+?=/; 
	const patternT = /=(.+)/; 
	let masStr = stringInput.match(patternF); 
	if (masStr !== null) { 
		for (j; j<=masStr.length-1; j++) { 
			let masPathVal = masStr[j].match(patternS); 
			let masValPair = masStr[j].match(patternT); 
			if ((masPathVal !== null) && (masValPair !== null)) {	 
				let masPath = masPathVal[0].slice(0,-1).match(/[^\s.]+/gi);; 
				let masVal = masValPair[0].slice(1).replace(/=/g,' '); 
				masVal = ((masVal.trim().indexOf('"') === 0) && (masVal.trim().lastIndexOf('"') === masVal.trim().length-1)) ?
					masVal.trim().substring(1,masVal.trim().length-1) : masVal.trim(); 
				if (masVal !== '') { 
					objCreate(object,masPath,masPath.length,masVal,0); 
				};
			};
		};
	};
	return object;	
};