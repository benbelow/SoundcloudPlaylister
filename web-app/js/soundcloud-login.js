SC.initialize({
  client_id: 'a3bc76cec61309bd955cdf30999390c4',
  redirect_uri: 'http://localhost:8088/callback.html'
});

// initiate auth popup
SC.connect().then(function() {
  return SC.get('/me');
})
.then(function(me) {
  console.log("Logged in as " + me.username);
});
