
  export default function(tableName){
  	if(!tableName || typeof tableName !=="string") return null;
  	tableName = tableName.toUpperCase().trim();
  	if(tableName === "VCARD"){return require("./vCard").default;}
	return null;
  }
              