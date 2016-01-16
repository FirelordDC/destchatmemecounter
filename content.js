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
                                                        
                                                             


