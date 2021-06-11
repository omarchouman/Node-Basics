
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
 function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
// var list = [['','11'],['✓','2'],['','3']];
var list = [];
var fs = require('fs');
var path="./database.json";
var path="./test.json";
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n' || text.startsWith("hello ") || text.startsWith("hello\t")){
    hello(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text.startsWith("list")){
    tasks(list);
  }
  else if(text.startsWith("add ")){
    add(text);
  }
  else if(text === 'remove\n' ||text.startsWith("remove ")){
    remove(text);
  }
  else if(text.startsWith("edit ")){
    edit(text);
  }
  else if(text.startsWith("check ")){
    check(text);
  }
  else if(text.startsWith("uncheck ")){
    uncheck(text);
  }

  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(c){
  console.log(c.trim()+"!!")
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!');
  fs.open(path,'w+',function(err,file){
    if(err){
      throw err;
    } 

    fs.writeFileSync(path,"");
    fs.appendFileSync(path,"{\n");
    fs.appendFileSync(path,'\t"list": [\n');
    for(let i=0;i<list.length;i++){
      fs.appendFileSync(path,"\t\t{\n");
      fs.appendFileSync(path,'\t\t\t"name" : "'+list[i][1]+"\",\n");
      if(list[i][0]==""){
        fs.appendFileSync(path,'\t\t\t"checked" : false\n');
      }
      else {
        fs.appendFileSync(path,'\t\t\t"checked" : true\n');
      }
      if(i==list.length-1){
        fs.appendFileSync(path,"\t\t}\n");
      }
      else{
        fs.appendFileSync(path,"\t\t},\n");
      }
      
      
    }
    fs.appendFileSync(path,'\t]\n');
    
    fs.appendFileSync(path,"}\n");
    fs.close(file,function(){
      process.exit();

    });
    
    


  });
  
}
/**
 * list of the commands
 *
 * @returns {void}
 */
function help(){
  console.log("\n")
  console.log("quit or exit - quits the application\n");
  console.log("hello - prints hello\n");
  console.log("hello yourname - prints hello + your name\n");
  console.log("list - prints all the possible commands of this application\n");
  console.log("remove - removes a certain task\n");
  console.log("add taskname - adds a certain task\n");
  console.log("check tasknumber - marks the specified task as done\n");
  console.log("uncheck task number - demarks the specified tasks so it is not done yet\n");
}

function tasks(list){
  for(let i = 0;i<list.length;i++){
    if(list[i][0]==""){
    console.log( [i+1] + ") " + " [] " + list[i][1]);
  }
  else
  console.log( [i+1] + ") " + " [✓] " + list[i][1]);
  }
}
function add(c){
  c = c.trim();
  list.push(["",c.substring(4).trim()]);
}
function remove(c){
  c = c.trim();
  if(c.length == 6){
    list.pop();
  }
  else if(c.substring(7) >list.length || c.substring(7)<=0)
  console.log("taks number doesn't exist");
  else{
    let v = parseInt(c.substring(7)) - 1;
  list.splice(v,1);
}
}

function edit(c){
  c = c.replace("\n","");
  c=c.split(" ");
  console.log(c[1]);
  for(var i = 0;i<c[1].length;i++){
    if(c[1][i]<"0" || c[1][i]>"9"){
    break;
    }
    else{
    }
  }
  var str="";
  if(i==c[1].length && c.length>2){
    for(let j=2;j<c.length;j++){
      if(j>2)
      str+=" "+c[j];
      else
      str+=c[j]
    }
    console.log(list[i][1]);
    list[c[1]-1][1] = str;
  }
  else{
    for(let j=1;j<c.length;j++){
      if(j>1)
      str+=" "+c[j];
      else
      str+=c[j]
    }
    list[list.length-1][1] = str;
  }
}
function check(text){
  text = text.split(" ");
  list[text[1]-1][0] = '✓';
}
function uncheck(text){
  text = text.split(" ");
  list[text[1]-1][0] = '';
}
function create(){
  var myargs = process.argv.slice(2);
  if(typeof(myargs[0])!="undefined"){
    path ="./"+myargs[0];
  }
  var config;
  fs.readFile(path,'utf8',(err,data) => {
    try{
    config = JSON.parse(data);
    for(let i = 0;i<config.list.length;i++){
      if(config.list[i].checked){
        list.push(["✓",config.list[i].name]);
      }
      else{
        list.push(["",config.list[i].name]);
      }
    
    }
  }
  catch(e){

  }
  });
  


  
}
startApp("Omar Chouman")
create();