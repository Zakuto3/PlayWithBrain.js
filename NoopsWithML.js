const brain = require('brain.js');
const fetch = require('node-fetch');
const fs = require('fs');
let trainData = require('./Data.json');
let url = 'https://api.noopschallenge.com';

const network = new brain.recurrent.LSTM();

let testData = trainData[trainData.length - 1];
trainData.pop();

let slicedData = trainData.slice(0,1);

network.train([{input:"hell", output:"lleh"}]);
const output = network.run('eh'); 

console.log("INPUT: ", testData.input);
console.log("OUTPUT: ", testData.output);
console.log("AI-Chan: ", output);

function saveFile(){
    fs.writeFile("network.json", JSON.stringify(network.toJSON()), function(err) {
        if(err)
            return console.log(err);

        console.log("The file was saved!");
        //loadFile()
    });
}

function loadFile(){
    return obj = JSON.parse(fs.readFileSync('network.json', 'utf8'));
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

    fs.writeFile("H:/TESSST/BrainLab/Data.json",JSON.stringify(storedData),()=>{console.log("Write to File Done to ", __dirname);});
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
