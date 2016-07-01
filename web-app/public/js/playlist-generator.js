function generatePlaylistFromComments(){
  fetch(document.playlistForm.postLink.value + ".json?")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    results = []
    $.each(data[1].data.children, function (i, item) {
      var comment = item.data.body
      var author = item.data.author
      var postcomment = '<p>[Author]' + author + '<br>' + comment + '</p>'
      results.push(postcomment)
    });
    return results;
  })
  .then(function(results){
    var scResults = getAllSoundCloudLinks(results);
    getSoundCloudIdsFromLinks(scResults);
  });
}

function getSoundCloudIdsFromLinks(links){
  promises = links.map(getSoundCloudIdFromLink);
  Promise.all(promises).then(function(values){
    console.log(values);
    createPlaylist(values)
  });
}

function createPlaylist(trackIds){
  var tracks = trackIds.map(function(id){return {"id": id}});
  getExistingPlaylists().then(function(playlists){
    var newPlaylistName;
    fetch(document.playlistForm.postLink.value + ".json?")
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      newPlaylistName = data[0].data.children[0].data.title
    })
    .then(function(){
      var existingNames = playlists.map(function(playlist){return playlist.title})
      var sharing = document.playlistForm.isPrivatePlaylist.checked ? "private" : "public";
      if(!existingNames.includes(newPlaylistName)){
          SC.connect().then(function() {
          SC.post('/playlists', {
            playlist: { title: newPlaylistName, tracks: tracks, sharing: sharing }
          })
          .then(function(data){
            $("#playlistLink").text('I GOT YOU A PLAYLIST!');
          });
        });
      }
      else{
        var existingList = playlists.filter(function(playlist){return playlist.title == newPlaylistName})[0];
        var newTracks = tracks.filter(function(track){return !existingList.tracks.map(function(t){return t.id}).includes(track.id) });
        if(newTracks.length == 0){
          return;
        }
        var allTracks = newTracks.concat(existingList.tracks);
        var addTracks = function(playlist) {
          return SC.put('/playlists/' + playlist.id, {
            playlist: { tracks: allTracks, sharing: sharing }
          })
          .then(function(data){
            $("#playlistLink").text(data.title);
            $("#playlistLink").attr("href", data.permalink_url);
          });;
        };
        for(var i=0; i<newTracks.length; i++){
          addTracks(existingList);
        };
        console.log(newTracks);
      }
    });
  });
}

function getExistingPlaylists(){
  return SC.connect().then(function(){
    return SC.get("/me/playlists")
    .then(function(result){
      console.log(result.map(function(playlist){return playlist.title}))
      return result;
    });
  });
}

function getSoundCloudIdFromLink(link){
  return fetch("https://api.soundcloud.com/resolve.json?url=" + link + "&client_id=a3bc76cec61309bd955cdf30999390c4")
  .then(function(response){
    return response.json();
  })
  .then(function(track){
    return track.id
  });
}

function getAllSoundCloudLinks(listOfComments){
  var links = [];
  for(var i=0; i<listOfComments.length; i++){
    links = links.concat(getSoundCloudLinks(listOfComments[i]));
  };
  return links;
}

function getSoundCloudLinks(comment){
  return findUrls(comment).filter(isSoundCloudLink)
}

function findUrls(text)
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find FTP, HTTP(S) and email URLs.
    var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }

    return urlArray;
}

function isSoundCloudLink(link){
  return link.includes("soundcloud.com")
}
