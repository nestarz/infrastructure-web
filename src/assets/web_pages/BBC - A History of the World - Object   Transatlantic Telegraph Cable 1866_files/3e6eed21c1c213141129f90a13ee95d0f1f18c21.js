glow.onDomReady(function() {
    var link, features, aodWindowName;
    link = glow.dom.get('.aod-link, #aod-link');
    if (link.length == 0) {
        return;
    }
    window.name = 'main';
    aodWindowName = 'aod'

    if(link.attr("href").indexOf('/iplayer/') != -1) {
        features = 'width=512,height=270';
    } else {
        features = 'width=713,height=545';
    }

    features = features + ',toolbar=no,personalbar=no,location=no,directories=no,statusbar=no,menubar=no,status=no,resizable=no,left=60,screenX=60,top=100,screenY=100';

    link.each( function() {
        this.onclick = function() {
            if (window.open(this.href, aodWindowName, features)) {
                return false;
            } else {
                return true;
            }
        }
    });
});