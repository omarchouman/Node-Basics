
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


var list = ["buy batata", "buy orange"];

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
  else if(text === "hello\n" || text.startsWith("hello ") || text.startsWith("hello\t")){
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
  else if(text === 'remove\n' || text.startsWith("remove")){
    remove(text);
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
  console.log("exit or quit - quits the application\n");
}


function tasks(list){
  for(var i = 0; i < list.length; i++){
    console.log(i + 1 + ") " + list[i]);
  }
}

function add(text){
  text = text.trim();
  list.push(text.substring(4).trim());
}

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
