$(document).ready(function() {

  let friendName = '';
  let scorez = [];
  let description = '';
  let picURL = '';
  $('.nextPls').on('click', function() {
    friendName = $("#friendName").val().trim();
    picURL = $("#picURL").val().trim();
    description = $("#descriptionz").val().trim();
    if (friendName.length > 2 && picURL.length > 2 && description.length > 2) {
      $('.carousel').carousel('next');
    } else { alert("Hey fill up the fields they're all required!"); }
  });
  
  $('.nextPlz').on('click', function() {
      $('.carousel').carousel('next');
  });
  
  $(".surveyQ").on("click", function(e) {
        // console.log(`Question 1 Choice: ${scorez[0]});
    scorez.push(parseInt($(this).attr("value")));
    console.log(`button clicked, selected: ${scorez[0]}`);
  });
  
  
  $(".gatherData").on("click", function(event) {
    console.log("CONCLUDING TRANSMISSION");
    event.preventDefault();
  
    let newFriend = {
      "name": friendName,
      "photo": picURL,
      "description": description,
      "scores": scorez
    };
  
    console.log(`A new friend is created: ${newFriend}`);
    
    $.post("/api/friends", newFriend, 
      function(data) {
        if (data) {
            console.log("POST: friendZoned!");
        } 
    });
    friendPair(newFriend);
    
  });
  
  // PAIRING LOGIC --- you will be paired with a friend with the same choice as yours on question 5, and Charlie Shone....
  function friendPair(newFriend) {
    $('.carousel').carousel('next');
    
    setTimeout(function() {
    
    let frand = newFriend;
    let frandscore = parseInt(frand.scores[4]);
    let plusfive = 5+frandscore;
    console.log(frandscore + " five equals " + plusfive);
  
    $.get("/api/friends", function(resp) {
      if(resp) {
        friendMatch = resp[frandscore];
        tigerBlood = resp[0];
        console.log("The winning friend is " + friendMatch.name);
        alert("The winning friend is " + friendMatch.name);
        let matchOneHTML = `<div><img src="${friendMatch.photo}" width="200px" height="300px"/></div><div><h3>${friendMatch.name}</h3></div><div><p>${friendMatch.description}</p></div><br><br>`;
        let matchTwoHTML = `<div><img src="${tigerBlood.photo}" width="200px" height="300px"/></div><div><h3>${tigerBlood.name}</h3></div><div><p>${tigerBlood.description}</p></div><br><br>`;
        $("#friendMatch1").append(matchOneHTML);
        $("#friendMatch2").append(matchTwoHTML);
      }
    
    })
      $('#pairingModey').modal('show');      
    }, 5000);
  
  }
  
  });