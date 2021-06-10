
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


var list = [['','1'],['✓','2'],['','3']];

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
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === "hello\n" || text.startsWith("hello") || text.startsWith("hello\t")){
    hello(text);
  }
  else if(text === "help\n"){
    help()
  }
  else if(text.startsWith("list")){
    tasks(list);
  }
  else if(text.startsWith("add")){
      add(text);
  }
  else if(text === "remove\n" || text.startsWith("remove")){
    remove(text);
  }
  else if(text.startsWith("edit")){
    edit(text);
  }
  else if(text.startsWith("check")){
    check(text);
  }
  else if(text.startsWith("uncheck")){
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
 * says hello and your name if you type it otherwise it says only hello
 *
 * @returns {void}
 */
function hello(text){
  text = text.replace("\n", "");
  text = text.trim(" ");
  console.log(text);
}

/**
 * Lists all the possible commands that are valid inside the app
 *
 * @returns {void}
 */
function help(){
  console.log("\n");
  console.log("--- All Commands ---\n");
  console.log("hello - prints hello and greets you\n");
  console.log("list - lists all the possible commands that you can use\n");
  console.log("add - adds new task\n");
  console.log("remove - removes a certain task\n");
  console.log("edit - edits the tasks");
  console.log("check - marks the task as done\n");
  console.log("uncheck - demarks the task so it becomes undone");
  console.log("exit or quit - quits the application\n");
}

/**
 * Lists the user's tasks
 *
 * @returns {void}
 */
function tasks(list){
  for(var i = 0; i < list.length; i++){
    console.log(list[i]);
  }
}

/**
 * Adds a new task
 *
 * @returns {void}
 */
function add(text){
  text = text.trim();
  list.push(text.substring(4).trim());
}

/**
 * Removes an existing task
 *
 * @returns {void}
 */
function remove(text){
  text = text.trim();
  if(text.length == 6){
    list.pop();
  }
  else if(text.substring(7) >=list.length || text.substring(7)<0){
    console.log("task number doesn't exist");
  }
  else{
  list.splice(text.substring(7),1);
}
}

/**
 * Edits the task
 *
 * @returns {void}
 */
function edit(c){
  c = c.replace("\n","");
  c=  c.split(" ");

  for(var i = 0;i<c[1].length;i++){
    if(c[1][i]<"0" || c[1][i]>"9"){
      break;
    }
  }
  var str="";
  if(i==c[1].length){
    for(let j=2;j<c.length;j++){
      if(j>2)
      str+=" "+c[j];
      else
      str+=c[j]
    }
    list[i] = str;

  }
  else{
    for(let j=1;j<c.length;j++){
      if(j>1)
      str+=" "+c[j];
      else
      str+=c[j]
    }
    list[list.length-1] = str;
  }
}

/**
 * marks as done
 *
 * @returns {void}
 */
function check(text){
  text = text.split(" ");
  list[text[1]-1][0] = '✓';
}

/**
 * demarks the task
 *
 * @returns {void}
 */
function uncheck(text){
  text = text.split(" ");
  list[text[1]-1][0] = '';
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Omar Chouman")
