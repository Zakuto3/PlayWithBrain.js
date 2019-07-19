const brain = require('brain.js');
const fetch = require('node-fetch');
const fs = require('fs');
let trainData = require('./Data.json');
let url = 'https://api.noopschallenge.com';
let input;

const config = {
    hiddenLayers: [20,20],
};

const trainconfig ={
    iterations: 50000,      // default 20000 the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.010,   //0.005 the acceptable error percentage from training data --> number between 0 and 1
    log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 10,        // iterations between logging out --> number greater than 0
    learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
    callback: null,       // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity 
};

const network = new brain.recurrent.LSTM(config);

let testData = trainData[trainData.length - 1];
trainData.pop();
let slicedData = trainData.slice(0,1);
input = testData.input;

//Megistos, Ramses, Reida, Jin, Zangetsu, Neica 

network.train(trainData, trainconfig);
//network.fromJSON(loadFile('network2020'));
const output = network.run(input);

//trubleshoot
//network.train([{input:'OL',output:'LO'},{input:'OLE',output:'ELO'}]);
//network.fromJSON(loadFile('network'));
//const output = network.run("OL"); 

console.log("INPUT: ", input);
console.log("OUTPUT: ", testData.output);
console.log("AI-Chan: ", output);

saveNetwork(network);

function saveNetwork(network){
    fs.writeFileSync(__dirname+"/network.json", JSON.stringify(network.toJSON()), function(err) {
        if(err)
            return console.log(err);

        console.log("The Network was saved!");
        //loadFile()
    });
}

function loadFile(NetName){
    return JsonNet = JSON.parse(fs.readFileSync(__dirname+`/${NetName}.json`, 'utf8'));
}

//main(); 
async function main(){
    let storedData = [];
    let outputData;
    let data;

    data = await fetchPost1("/riddlebot/start",{login:"zakuto3"});
    for (let index = 0; index < 100; index++) {

        
        data = await fetchPost1(data.riddlePath);
        //console.log("BEFORE: ",data.riddleText);
        outputData = reverseString(data.riddleText);
        //console.log("AFTER: ",data);
        storedData.push({input:data.riddleText,output:outputData});
        
    }

    fs.writeFile(__dirname+"/Data.json",JSON.stringify(storedData),()=>{console.log("Write to File Done to ", __dirname);});
}


function reverseString(str) {
  if (str === "")
    return "";
  else
    return reverseString(str.substr(1)) + str.charAt(0);
}

async function fetchPost1(q,data=""){
    if (data) {
        let res = await fetch(url+q,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        });
        return await res.json();
    }else{
        let res = await fetch(url+q);
        return await res.json();
    }
}
