const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const csvFilePath = path.join(__dirname, 'customer-data.csv');

const converter = function(callback){
	let buff = [];
	csv().fromFile(csvFilePath)
	.on('json', (json) =>{
		buff.push(json);		
	})
	.on('end', (error) =>{
		if(error) console.log(error);
		callback(buff);
	});
}

const gravar = function(json){	
	const folderName = uuidv1();
	fs.mkdirSync(folderName);
	fs.writeFileSync(path.join(__dirname, folderName, 'customer-data-solution.json'), JSON.stringify(json, null, '  '));		
}

converter(gravar);