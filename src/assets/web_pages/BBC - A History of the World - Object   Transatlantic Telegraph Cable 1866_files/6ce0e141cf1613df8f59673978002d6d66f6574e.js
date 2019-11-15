
flagForReview = { 
	init : function() { 
		// get object id, screen name and mail address from hidden fields
		var objectid = glow.dom.get('#objectid').val();
		var screenname = glow.dom.get('#screenname').val();
		var mailaddress = glow.dom.get('#mailaddress').val();
		var reason = '';
		var body = 'Object ' + objectid + ' has been flagged for review by ' + screenname + '. ' + reason;
		
		glow.events.addListener('form#flagforreviewform ul li input.radioButton', 'click', function() {
			// get the reason from the radio id
			var id = this.id;
			var reason = 'Reason for flag = ' + id;
			
			// create the mail body message
			var body = 'Object ' + objectid + ' has been flagged for review by ' + screenname + '. ' + reason;
			// construct the link
			var mailtoLink = '<a class="flagForReviewSend" id="flagForReviewSendLink" href="mailto:' + mailaddress + '?subject=Object flagged for review' + '&body=' + body + '">Register my complaint</a>';
			// remove the old links 
			glow.dom.get('a.flagForReviewSend').remove();

			// add the new one
			glow.dom.get('#flagForReviewSubmitButton').prepend(mailtoLink);
			glow.events.addListener('#flagForReviewSendLink', 'click', function() { 
				//document.getElementById('flagforreviewform').style.height = '0px';
				glow.anim.slideUp("#flagforreviewform", 0);
			}); 
		});
		
		// Slide the form down when the link is clicked
		glow.events.addListener('#flagForReviewLink', 'click', function() { 
			glow.anim.slideDown("#flagforreviewform", 1);
		}); 
		
		// set the default link
		var mailtoLink = '<a class="flagForReviewSend" id="flagForReviewSendLink" href="mailto:' + mailaddress + '?subject=Object flagged for review' + '&body=' + body + '">Register my complaint</a>';

		// add the default link 
		glow.dom.get('#flagForReviewSubmitButton').prepend(mailtoLink);
		
		glow.events.addListener('#flagForReviewLink', 'click', function() { 
			glow.anim.slideUp("flagforreviewform", 0);
		}); 

	}
};



glow.onDomReady(function(){
	if (document.getElementById('flag-for-review-nojs')) {	
		document.getElementById('flag-for-review-nojs').style.display = 'none';
		document.getElementById('flag-for-review').style.display = 'block';
		//slide the form up
		glow.anim.slideUp("#flagforreviewform", 0);
		flagForReview.init();
	}
});