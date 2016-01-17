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
             console.log(messNum);
             chrome.storage.local.set({count: messNum});
              if(mainNode.getElementsByClassName("chat-emote").length > 0)
             {
                 emoteCounter(mainNode);
                 chrome.storage.local.set({emoteArray: emoteArray});
                 console.log(emoteArray);
             }
               if(mainNode.getElementsByClassName("chat-user").length > 0)
             {
                 userCounter(mainNode);
                 chrome.storage.local.set({userArray: userArray});
                 console.log(userArray);
             }
         }
             if(mainNode.className == "emotecount")
         {
               emoteArray[lastCombo].count ++;
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
var emoteArray = [];
var userArray =[];
function emoteCounter(currentNode)
{   
    if (currentNode.className == "chat-msg")
    {
        var tempArrayLoc = existEmoteArray(currentNode.getElementsByClassName("chat-emote").item(0).getAttribute("title"));
        if(lastCombo != tempArrayLoc)
        {
            lastCombo = tempArrayLoc;
        }
        emoteArray[tempArrayLoc].count ++;
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
        var lineNode = x.item(t);
        currentObj.name = lineNode.innerHTML;
        currentObj.count = 1;
        var tempArrayLoc = existUserArray(currentObj.name);
        if(tempArrayLoc === null)
        {
            userArray.push(currentObj);
        }else
        {
            userArray[tempArrayLoc].count ++;
        }
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
        var lineNode = x.item(t);
        currentObj.name = lineNode.getAttribute("title");
        currentObj.count = 1;
        var tempArrayLoc = existEmoteArray(currentObj.name);
        if(tempArrayLoc === null)
        {
            emoteArray.push(currentObj);
        }else
        {
            emoteArray[tempArrayLoc].count ++;
        }
    }
}
function existEmoteArray(name)
    {
        for (i=0; i<emoteArray.length; i++)
        {
            if(emoteArray[i].name === name)
            {
                return i;
            }
        }
        return null;
    }

function existUserArray(name)
    {
        console.log(name);
        for (i=0; i<userArray.length; i++)
        {
            if(userArray[i].name == name)
            {
                return i;
            }
        }
        return null;
    }
                                                        
                                                             


