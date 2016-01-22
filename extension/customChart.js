var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
      labels: [" "," "," "," "," "," "," "," "," "," ",
               " "," "," "," "," "," "," "," "," "," ",
               " "," "," "," "," "," "," "," "," "," ",
               " "," "," "," "," "," "," "," "," "," ",
               " "," "," "," "," "," "," "," "," "," ",
               " "," "," "," "," "," "," "," "," "," "],
      datasets: [
       
          {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              data: [0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0
                    ]
          }
      ]
    };

// Reduce the animation steps for demo clarity.
var myLiveChart = new Chart(ctx).Line(startingData, {animationSteps: 60});
document.getElementById("output").innerHTML = new Date().toTimeString();



setInterval(function(){
    updateMessCount();
    console.log(curMessNum,prevMessNum);
  // Add two random numbers for each dataset
  myLiveChart.addData([curMessNum-prevMessNum],new Date().toTimeString().substr(0,8));
  // Remove the first point so we dont just add values forever
  myLiveChart.removeData();
    prevMessNum = curMessNum;
    document.getElementById("currentMess").innerHTML = curMessNum;
    var tempDateMill = (Date.now()-mainDate);
    console.log("tempDatemill ="+ tempDateMill);
    var messagesPerMin = (curMessNum *1000 *60)/tempDateMill;
    console.log("messagesPerMin ="+ messagesPerMin);
    document.getElementById("messPerMin").innerHTML = messagesPerMin;
    makeEmoteList();
    makeUserList();
}, 1000);


var prevMessNum=0;
var curMessNum=0;
var mainDate;
var locEmoteArray=[];
var locUserArray=[];
var locUserDic ={};
var locEmoteDic = {};
function updateMessCount()
{
    chrome.storage.local.get("count", function(data) {
    if(typeof data.count == "undefined") {
        // That's kind of bad
    } else {
        curMessNum=data.count;
    }
});
    console.log(curMessNum);
}

function makeEmoteList()
{
    updateEmoteDic();
     updateLocEmoteArray();
    console.log(locEmoteArray);
    sortEmoteArray();
    var tempString = "<table>"
    for(i=0;i<locEmoteArray.length;i++)
    {
        tempString += "<tr><td>"+(i+1)+".</td><td>"+locEmoteArray[i].name+"</td><td>    "+locEmoteArray[i].count+"</td><tr>";
    }
    tempString += "</talbe>";
    document.getElementById("emoteRanks").innerHTML = tempString;
}
function sortEmoteArray()
{
    locEmoteArray.sort(function(a,b){return b.count -a.count});
}
function updateEmoteDic()
{
    chrome.storage.local.get("emoteDic", function(data) {
    if(typeof data.emoteDic == "undefined") {
        // That's kind of bad
    } else {
        locEmoteDic=data.emoteDic;
        console.log(locEmoteDic);
    }
});
}

function updateLocEmoteArray()
{
    locEmoteArray =[];
    for(var obj in locEmoteDic)
        {
            console.log(obj);
            if(locEmoteDic.hasOwnProperty(obj))
                {
                    locEmoteArray.push(locEmoteDic[obj]);
                }
        }
}

function makeUserList()
{
    updateUserDic();
    updateLocUserArray();
     console.log(locUserArray);
    sortUserArray();
    var tempString = "<table>"
    for(i=0;i<locUserArray.length;i++)
    {
        tempString += "<tr><td>"+(i+1)+".</td><td>"+locUserArray[i].name+"</td><td>    "+locUserArray[i].count+"</td><tr>";
    }
    tempString += "</talbe>";
    document.getElementById("userRanks").innerHTML = tempString;
}
function sortUserArray()
{
    locUserArray.sort(function(a,b){return b.count -a.count});
}
function updateUserDic()
{
    chrome.storage.local.get("userDic", function(data) {
    if(typeof data.userDic == "undefined") {
        // That's kind of bad
    } else {
        locUserDic=data.userDic;
        console.log(locUserDic);
    }
});
}
function updateLocUserArray()
{
    locUserArray =[];
    for(var obj in locUserDic)
        {
            console.log(obj);
            if(locUserDic.hasOwnProperty(obj))
                {
                    locUserArray.push(locUserDic[obj]);
                }
        }
}

chrome.storage.local.get("startDate", function(data) {
    if(typeof data.startDate == "undefined") {
        // That's kind of bad
    } else {
        mainDate=data.startDate;
    }
});

