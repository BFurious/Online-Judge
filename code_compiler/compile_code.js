const { execSync, execFileSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function compile(srcCodeFilePath, execFilePath){
    return new Promise((resolve, reject)=>{
        const command = 'g++ "' + srcCodeFilePath + '" -o'+' "' + execFilePath + '"';
        try{
            const output = execSync(command, {timeout: 30000});
            resolve(output.toString());
        }catch(e){
            reject(e.toString());
        }
    })
}

function runTestcase(execFilePath, inputFilePath){
    return new Promise((resolve, reject)=>{
        try{
            const output = execFileSync(execFilePath, {timeout: 5000, stdio: [fs.openSync(inputFilePath, "r"), "pipe", "pipe"]});
            resolve(output.toString());
        }catch(e){
            reject(e.toString());
        }
    })
}

function writeToFile(inputFilePath, input){
    return new Promise((resolve, reject)=>{
        fs.writeFile(inputFilePath, input, (err)=>{
            if(err)
                reject(err);
            resolve();
        })
    })
}

function runTestcases(testcases, testcaseIdx, execFilePath, inputFilePath){
    return new Promise((resolve, reject)=>{
        if(testcaseIdx >= testcases.length)
            return resolve("Passed all testcases.");
        const testcase = testcases[testcaseIdx];
        writeToFile(inputFilePath, testcase.input).then(()=>{
            runTestcase(execFilePath, inputFilePath).then((output)=>{
                if(testcase.output.trim() != output.trim()){
                    const wrongVerdict = "WA Testcase: " + testcaseIdx +" failed. Expected Output: " + testcase.output.trim() + " Actual Output: " + output.trim();
                    resolve(wrongVerdict);
                }else{
                    runTestcases(testcases, testcaseIdx+1, execFilePath, inputFilePath).then((data)=>{
                        resolve(data);
                    }).catch((e)=>{
                        reject(e);
                    })
                }
            }).catch((e)=>{
                reject(e);
            })
        }).catch((e)=>{
            reject(e);
        })
    })
}

function run(testcases, code, username){
    return new Promise((resolve, reject)=>{
        const fileName = username + "-" + new Date().getTime();
        const srcCodeFilePath = path.join(__dirname, "temp", fileName + ".cpp");
        const execFilePath = path.join(__dirname, "temp", fileName + ".exe");
        const inputFilePath = path.join(__dirname, "temp", fileName + ".txt");
        writeToFile(srcCodeFilePath, code).then(()=>{
            compile(srcCodeFilePath, execFilePath).then(()=>{
                runTestcases(testcases, 0, execFilePath, inputFilePath).then((verdict)=>{
                    if(fs.existsSync(srcCodeFilePath)) 
                        fs.unlinkSync(srcCodeFilePath);
                    if(fs.existsSync(execFilePath)) 
                        fs.unlinkSync(execFilePath);
                    if(fs.existsSync(inputFilePath)) 
                        fs.unlinkSync(inputFilePath);
                    resolve( verdict);
                }).catch((e)=>{
                    reject(e);
                })
            }).catch((e)=>{
                reject(e);
            })
        }).catch((e)=>{
            reject(e);
        })
    })
}

module.exports = { run };