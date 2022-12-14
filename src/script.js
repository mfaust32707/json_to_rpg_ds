function generate_ds() {
  var jsonInput = document.getElementById("json_input").value;

  var jsonObject = JSON.parse(jsonInput);

  var dataStruct = getStruct(jsonObject, 1);
  
  console.log(dataStruct);
  document.getElementById("json_output").value = dataStruct;
}

function getStruct(object, level) {
  const spaces = "               ";
  var rtnVal = "";
  Object.keys(object).forEach(function(key) {
    var type = typeof object[key];
    var isArray = object[key] instanceof Array;
    console.log(key + " = " + isArray + " " + type + " " + level.toString());
    if (isArray) {
      var objType = typeof object[key];
      if ((objType === "string")) {
          rtnVal +=  spaces.substring(0,level) + key + " varchar(" + (object[key][0].length * 2).toString() + ")  dim(99);\n";
      }
      else if (objType == 'object') {
       
       if (getChildKey(object[key]) === "0"  && (typeof object[key][0] === "object")) {
        rtnVal += spaces.substring(0,level) + "dcl-ds " + key + " dim(99);\n";  
         rtnVal += getStruct(object[key][0], level + 1);
        rtnVal += spaces.substring(0,level) + "end-ds;\n";
       } 
        else if ((typeof object[key][0]) !== "object" && object[key].length == 1) {
          rtnVal +=  spaces.substring(0,level)  + key + " varchar(100) dim(99);\n";  
       }
    }
      
    } else if (type === "string") {
      rtnVal +=  spaces.substring(0,level) + key + " varchar(" + (object[key].length * 2).toString() + ");\n";
    }

    else if (type == 'object') {
      if (object[key] !== null) {
        rtnVal += spaces.substring(0,level) + "dcl-ds " + key + ";\n";
        rtnVal += getStruct(object[key], level + 1);
        rtnVal += spaces.substring(0,level) + "end-ds;\n";
      }
      else {
             rtnVal +=  spaces.substring(0,level) + key + " varchar(100);\n";
      }
    } 
  });
  return rtnVal;
}

function getChildKey(obj) {
    var key;
    
    if (typeof obj === "object") {
        for (var k in obj) {
            key = k;
            break;
        }
    }
    return key;
}
