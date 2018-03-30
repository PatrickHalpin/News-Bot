console.log("Starting...");

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'a0FTXXXgDH1eDzHZFPWBuHu3A',
  consumer_secret:      'k9aWMp6Ma3NnTY3JKNaOCmNZKS9ks1VHiKYt7fSpxXXdKKfJey',
  access_token:         '131267065-LNLGk29HoyuU9IB2sDSftV9kE01fNjPGxLgU9EdJ',
  access_token_secret:  'HYdussjSvXZ3QOciv97BHrbMOf7wKdYgf80uSZwMKeUCv',
})

var stream = T.stream('user');

var words =["witness",
            "allegedly",
            "study" ,
            "rebuild" ,
            "space" ,
            "facebook",
            "smartphone",
            "electric",
            "senator",
            "car",
            "election",
            "gun" ,
            "google",
            "trump",
            "seeking",
            "goverment",
            "parents",
            "fund",
            "amazon",
            "sexual",
            "president",
            "commander in chief",
            "courtroom",
            "campaign",
            "shot",
            "police",
            "garda",
            "court",
            "jury",
            "trial",
            "administration",
            "border",
            "wall",
            "us",
            "usa",
            "america",
            "american",
            "russia",
            "jailed",
            "journalists",
            "london",
            "donald",
            "knife",
            "weapon"
        ];

var subWords = ["these dudes I know",
                "kinda probably",
                "tumblr post",
                "avenge",
                "SPAAAAAACE",
                "those dudes who stole our data",
                "pokedex",
                "atomic",
                "elf lord",
                "cat",
                "pie eating contest",
                "rooty tooty point and shooty",
                "skynet",
                "McTrumpcake",
                "half looking",
                "monkeys on typewriters",
                "birthgivers",
                "wad of cash",
                "that there online shop",
                "pop pop",
                "commander in chimp",
                "commander in chimp",
                "HALL OF JUDGEMENT",
                "tour of false promises",
                "capped in the A",
                "PO PO",
                "shades",
                "HALL OF JUDGEMENT",
                "deciders",
                "ordeal",
                "monkeys",
                "fake invisible line",
                "trump patented no entry device",
                "MURICA",
                "MURICA",
                "MURICA",
                "MURICA'N",
                "Vodka land" ,
                "locked up and the key thrown away",
                "monkeys on typewriters",
                "the queens home",
                "Pudgy",
                "stabby wabby",
                "rooty tooty point and shooty"
              ];

stream.on('tweet',response);

function response(eventMsg)
{
  //console.log(eventMsg);
  var id = eventMsg.id_str;
  var send=true;
  var changedWords=0;
  var replyTo = "@"+eventMsg.user.screen_name+" ";
  if (eventMsg.user.screen_name!=="substituteheads")
  {
    var spliced = [];
    var newT=[];

    if('extended_tweet' in eventMsg)
    {
      tweet= eventMsg.extended_tweet.full_text;
    }
    else
    {
      tweet=eventMsg.text;
    }

    spliced = tweet.split(" ");

    for(var i=0;i<spliced.length;i++)
    {
      var word = spliced[i].toLowerCase();
      console.log(spliced[i] + " "+i);
      if(word=="rt")
      {
        send=false;
      }
      if(words.includes(word))
      {
          var index = words.indexOf(word);
          newT.push(subWords[index]);
          changedWords++;
      }
      else
      {
        //console.log(word + " " + i);
        if (word.includes("https"))
        {
          console.log("Dont push");
        }
        else
        {
          newT.push(word);
        }
      }
    }
    var newTweet= newT.join(' ');
    var newTweet = newTweet.charAt(0).toUpperCase() + newTweet.slice(1,newTweet.length);
    console.log( newTweet );

    if(changedWords<2)
    {
      send=false;
    }

    if(send)
    {

    T.post('statuses/retweet/:id', {status: newTweet, id: id }, function (err, data, response)
    {
      console.log(data)
    })

    T.post('statuses/update', { status: newTweet }, function(err, data, response)
    {
        console.log(data);
    });


    }
  }

}
