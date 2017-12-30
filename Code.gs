
function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Teacher Tools', 'showSidebar')
      .addToUi();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onInstall(e) {
  onOpen(e);
}

function showSidebar() {
   var thisDoc = DocumentApp.getActiveDocument();
   var ui = HtmlService.createTemplateFromFile('Sidebar')
      .evaluate()
      .setTitle('Tools')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
       DocumentApp.getUi().showSidebar(ui);
}

function findHighlighted(colors) {
//  var colors = ['#E8E8EE','#E8E8EE']
  if (colors !== ""){
  var backGroundcolor = colors[0];
  var textColor = colors[1];
  }
  // Reset font
  var results = [];
  var body = DocumentApp.getActiveDocument().getBody(),
    bodyTextElement = body.editAsText(),
    bodyString = bodyTextElement.getText(),
    char, len;
  // Get text
  for (char = 0, len = bodyString.length; char < len; char++) {
    Logger.log(bodyTextElement.getBackgroundColor(char))
    if (bodyTextElement.getBackgroundColor(char) !== null && bodyTextElement.getBackgroundColor(char) !== '#ffffff' ){ // Is any hightlight
      results.push([char, bodyString.charAt(char)]);
  }
  // Set background
  if (colors !== ""){
//   for (char = 0, len = bodyString.length; char < len; char++) {
   if (bodyTextElement.getBackgroundColor(char) !== null && bodyTextElement.getBackgroundColor(char) !== '#ffffff' ){ // Is any hightlight
//      var size = bodyTextElement.getFontSize(char);
//      Logger.log(bodyTextElement.getBackgroundColor(char))
//      Logger.log(size);
      bodyTextElement.setForegroundColor(char,char, textColor).setBackgroundColor(char,char, backGroundcolor).setFontSize(char,char, 12)
  }  
  }
  }
  return results;
}

function getWords(colors,shuffleState) {
  var arr = findHighlighted(colors);
  var wordList = [];
  var holding = [];
  var nextNum, sum;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i + 1] === undefined) {
      nextNum = 0;
    } else {
      nextNum = arr[i + 1][0];
    }
      sum = (Number(arr[i][0]) + 1);
    if (nextNum === sum) {
      holding.push(arr[i][1]);
    } else {
      holding.push(arr[i][1]);
      wordList.push(holding.join(""));
      holding = [];
    }
  }
  pasteWordList(wordList,shuffleState)
}
    

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


    
function pasteWordList(wordList,shuffleState){
   var list;
   var targetDoc = DocumentApp.getActiveDocument();
   var body = DocumentApp.getActiveDocument().getBody();
   var text = body.editAsText();
   var cursor = targetDoc.getCursor().getElement();
   var cursorParent  = cursor.getParent().getChildIndex(cursor);
   //var cursorPoint = cursorParent.getParent().getChildIndex(cursorParent);
   var start = cursorParent;
   if (shuffleState === true){

   list = shuffle(wordList);
   } else {
   list = wordList
   }
  
   for (var word in list){
   text.appendText('\n'+ list[word]);
   }

}    
  



