      var promoData = [];
      glow.onDomReady( function() {
        function tabbedPromos() {
          var pics   = glow.dom.get("#tabbed-promos .pics");
          var tabs   = glow.dom.get("#tabbed-promos .tabs");
          tabs.each( function( i ) {
            var tabAnchor  = glow.dom.get( ".tab-link-" + (i+1) )[0];
            var currentPic = glow.dom.get( "#pic-"      + (i+1) );
            var currentTab = glow.dom.get( tabs[i] );
            glow.events.addListener( tabAnchor, 'click', function() {
              if ( promoData[ (i+1) ] ) { //filter out default loaded pic-1
                currentPic.get( ".image-placeholder" )[0].innerHTML = '<img width="626" height="329"  src="' + promoData[(i+1)].src + '" alt="' + promoData[(i+1)].alt + '" />';
              }
              pics.removeClass    ( 'current' );
              tabs.removeClass    ( 'current' );
              currentPic.addClass ( 'current' );
              currentTab.addClass ( 'current' );
              return false;
            });   
          });  
        }
        tabbedPromos();
      
	  glow.dom.get("#tab-1").addClass("current");
	  
	  });