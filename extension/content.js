var messNum =0;
var dateNow = Date.now();
console.log(dateNow);
chrome.storage.local.set({startDate: dateNow});
//content.js
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
  // console.log(mutation.addedNodes);
   var mainNode = mutation.addedNodes[0];
     if(mainNode != null)
     {
      console.log(mainNode);
         if(mainNode.className == "user-msg"||mainNode.className == "user-msg continue"||mainNode.className == "chat-msg")
         {
             messNum ++;
             //console.log(messNum);
             chrome.storage.local.set({count: messNum});
              if(mainNode.getElementsByClassName("chat-emote").length > 0)
             {
                 emoteCounter(mainNode);
                 chrome.storage.local.set({emoteDic: emoteDic});
                 console.log(emoteDic);
             }
               if(mainNode.getElementsByClassName("chat-user").length > 0)
             {
                 userCounter(mainNode);
                 chrome.storage.local.set({userDic: userDic});
                 //console.log(userArray);
             }
         }
             if(mainNode.className == "emotecount")
         {
               emoteDic[lastCombo].count ++;
              chrome.storage.local.set({emoteDic: emoteDic});
                console.log("wow");
         }
     }
 });
});

observer.observe(document, {
  subtree: true,
  childList: true
  //...
});
var lastCombo;
//var emoteArray = [];
//var userArray =[];
var userDic ={};
var emoteDic ={};

function emoteCounter(currentNode)
{   
    if (currentNode.className == "chat-msg")
    {
        var name =currentNode.getElementsByClassName("chat-emote").item(0).getAttribute("title");
        //var tempArrayLoc = existEmoteArray(currentNode.getElementsByClassName("chat-emote").item(0).getAttribute("title"));
        if(lastCombo != name)
        {
            lastCombo = name;
        }
      //  emoteArray[tempArrayLoc].count ++;
        emoteDic[lastCombo].count++;
    }
    else
    {
        nonChatMsgCounter(currentNode);
    }
}

function userCounter(currentNode)
{
    var currentObj = {
        name : "meme",
        count : 0
    };
    var x = currentNode.getElementsByClassName("chat-user");
    console.log("# user"+x.length);
    for(t=0;t<x.length;t++)
    {
       // var userArrayPos = userArray.length;
        var lineNode = x.item(t);
        currentObj.name = lineNode.innerHTML;
        currentObj.count = 1;
        if(typeof userDic[currentObj.name] !=  "undefined")
        {
                userDic[currentObj.name].count ++;
        }
        else
        {
            userDic[currentObj.name] = currentObj;
        }
        console.log(userDic);
/*        var tempArrayLoc = existUserArray(currentObj.name);
        if(tempArrayLoc === null)
        {
            userArray.push(currentObj);
            userDic[currentObj.name] = userArrayPos;
            console.log(userDic);
        }else
        {
            userArray[tempArrayLoc].count ++;
        }*/
    }
}

function nonChatMsgCounter(currentNode)
{
    var currentObj = {
        name : "meme",
        count : 0
    };
    var x = currentNode.getElementsByClassName("chat-emote");
    console.log("# emotes"+x.length);
    for(t=0;t<x.length;t++)
    {
       // var emoteArrayPos = emoteArray.length;
        var lineNode = x.item(t);
        currentObj.name = lineNode.getAttribute("title");
        currentObj.count = 1;
          if(typeof emoteDic[currentObj.name] !=  "undefined")
        {
                emoteDic[currentObj.name].count ++;
        }
        else
        {
            emoteDic[currentObj.name] = currentObj;
        }
        console.log(emoteDic);
    }
    
}                                            
                                                             


