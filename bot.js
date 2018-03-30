console.log("Starting...");

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'paf6YrqSSA0NyzpIKl0b3spoE',
  consumer_secret:      'dg7X9bz2587h9t3U52cGoHSuaw6aGE5sPcsVECm1pMQXKimLoq',
  access_token:         '979375435745255424-ymRCM4NXJo0d3P2MA5jOKaoBoHMMNMT',
  access_token_secret:  'gViuyM5vKO0bXbnGyN9gP31eIfqV1fhoDtFAEoCxCmZaZ',
})

var tier1 = ["Lazy", "Stupid", "Insecure", "Idiotic" , "Slimy", "Slutty" ,"Smelly" , "Pompus" , "Communist" , "Dicknose", "Pie-eating" ,"Racist","Elitist","White Thrash","Drug Loving", "Butterface","Tone Deaf","Ugly","Creepy"];
var tier2 = ["Douche","Ass","Turd","Rectum","Butt","Cock","Shit","Crotch","Bitch","Prick","Slut","Taint","Fuck","Dick","Boner","Shart","Nut"];
var tier3 = ["Pilot","Canoe","Captain","Pirate","Hammer","Knob","Box","Jockey","Nazi","Waffle","Goblin","Blossom","Biscut","Clown","Socket","Monster","Hound","Dragon","Balloon"];


function GetRandom (max,min)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var stream = T.stream('user');

stream.on('tweet',respond);

function respond(eventMsg)
{
  var replyTo = eventMsg.in_reply_to_screen_name;
  var from =eventMsg.user.screen_name;
  var txt = eventMsg.text;

  if(replyTo="bot_insults")
  {
  var insult1 = tier1[GetRandom(tier1.length-1,0)];
  var insult2 = tier2[GetRandom(tier2.length-1,0)];
  var insult3 = tier3[GetRandom(tier3.length-1,0)];
  var insult ="You " + insult1 +" "+ insult2 +" "+ insult3;
  console.log("TO: "+replyTo+ " FROM: "+from+" TWEET: "+txt);
  var client = txt.replace(/ .*/,'');
  var tweet = client + " " + insult;
  myTweet(tweet);
  }
}

function myTweet(msg)
{
  T.post('statuses/update', { status: msg }, function(err, data, response)
  {
    console.log(msg);
    console.log(data);
    if(!err)
    {
      console.log("success");
    }
  })
}
