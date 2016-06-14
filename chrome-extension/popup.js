console.log("JJJJ")

SC.initialize({
  client_id: 'a3bc76cec61309bd955cdf30999390c4',
  redirect_uri: 'http://example.com/callback'
});

// initiate auth popup
SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});
