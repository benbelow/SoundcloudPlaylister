if(window.location.hostname == "localhost"){
  SC.initialize({
    client_id: 'e2faf70422dd2a5bbc0240ade53aab4f',
    redirect_uri: 'http://localhost:8088/callback.html'
  });
}
else {
  SC.initialize({
    client_id: 'a3bc76cec61309bd955cdf30999390c4',
    redirect_uri: 'https://reddit-to-soundcloud.firebaseapp.com/callback.html'
  });
}
