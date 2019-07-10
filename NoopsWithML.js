const brain = require('brain.js');
const fetch = require('node-fetch');
const fs = require('fs');
const network = new brain.NeuralNetwork({activation:'leaky-relu'});
let url = 'https://api.noopschallenge.com';

network.train([
    {input:[1], output:[1]},
    {input:[0], output:[0]}
])

const output = network.run([1]);

//main
(async ()=>{
    let data = await fetchPost1("/riddlebot/start",{login:"zakuto3"});
    data = await fetchPost1(data.riddlePath);
    console.log("BEFORE: ",data.riddleText);
    data = reverseString(data.riddleText);
    console.log("AFTER: ",data);
    fs.writeFile("H:/TESSST/BrainLab/Data.json", "Hello",()=>{console.log("Write to File Done to ", __dirname);});
})();


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
