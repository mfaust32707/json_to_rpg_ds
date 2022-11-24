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
      if ((typeof object[key][0]) !== "object") {
        var typeNew = typeof object[key][0];
        if (typeNew === "string") {
          rtnVal +=  spaces.substring(0,level) + key + " varchar(" + (object[key][0].length * 2).toString() + ")  dim(99);\n";
        }
      }
      if ((typeof object[key][0]) == 'object') {
        rtnVal += spaces.substring(0,level) + "dcl-ds " + key + " dim(99);\n";
         rtnVal += getStruct(object[key][0], level + 1);
        rtnVal += spaces.substring(0,level) + "end-ds;\n";
    }
      
    } else if (type === "string") {
      rtnVal +=  spaces.substring(0,level) + key + " varchar(" + (object[key].length * 2).toString() + ");\n";
    }

    if (type == 'object') {
      rtnVal += spaces.substring(0,level) + "dcl-ds " + key + ";\n";
      rtnVal += getStruct(object[key], level + 1);
      rtnVal += spaces.substring(0,level) + "end-ds;\n";
    } 
  });
  return rtnVal;
}
