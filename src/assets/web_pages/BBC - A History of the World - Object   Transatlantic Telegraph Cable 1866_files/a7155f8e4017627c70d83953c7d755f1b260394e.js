if(!bbc)		{var bbc = {};}
if(!bbc.ahotw)	{bbc.ahotw = {};}


bbc.ahotw.SeaDragon = function(myFile) {
	var that				= this;

	this.xmlFile			= myFile;
	this.glow				= null;
	this.viewer				= null;

	this.init = function()
	{
		gloader.load(["glow", "1", "glow.dom"], {
			onLoad: function(glow) {
				glow.ready(function() {
					that.glow = glow;
					that.initDeepZoom();
				});
			}
		});
	},

	this.initDeepZoom = function()
	{
		this.viewer = new Seadragon.Viewer("galleryInner"); //Attaching the javascript to associated div element

		this.glow.dom.get("#galleryInner").css("width", "620px"); //Setting width of Sea Dragon Viewer Using BBC Glow
		this.glow.dom.get("#galleryInner").css("height", "346px"); //Setting height of Sea Dragon Viewer Using BBC Glow
		this.glow.dom.get("#galleryInner").css("border", "3px solid #ffffff"); //Setting width of Sea Dragon Viewer Using BBC Glow
		this.glow.dom.get("#galleryInner").css("background", "#000000"); //Setting background of Sea Dragon Viewer Using BBC Glow
		this.glow.dom.get("#galleryInner").css("display", "block"); //Setting display settings of Sea Dragon Viewer Using BBC Glow
		this.glow.dom.get(".nonjs-alert").css("display", "none"); //Hides Non-JS message and placeholder

		this.viewer.addControl(this.panRightButton(), Seadragon.ControlAnchor.TOP); //Creating panning controls - Right
		this.viewer.addControl(this.panLeftButton(), Seadragon.ControlAnchor.TOP); //Creating panning controls - Left
		this.viewer.addControl(this.panUpButton(), Seadragon.ControlAnchor.TOP); //Creating panning controls - Up
		this.viewer.addControl(this.panDownButton(), Seadragon.ControlAnchor.TOP); //Creating panning controls - Down

		this.viewer.openDzi(this.xmlFile);
	},

	//The Following Functions create the buttons for the panning controls
	this.panRightButton = function()
	{
		var control = document.createElement("a");
		var controlText = document.createTextNode("Right");

		control.href = "#";                 // so browser shows it as link
		control.className = "buttonright";
		control.title = "Pan Right";
		control.appendChild(controlText);
		Seadragon.Utils.addEvent(control, "click", this.onPanRight);
		return control;
	},

	this.panLeftButton = function()
	{
		var control = document.createElement("a");
		var controlText = document.createTextNode("Left");

		control.href = "#";                 // so browser shows it as link
		control.className = "buttonleft";
		control.title = "Pan Left";
		control.appendChild(controlText);
		Seadragon.Utils.addEvent(control, "click", this.onPanLeft);
		return control;
	},

	this.panUpButton = function()
	{
		var control = document.createElement("a");
		var controlText = document.createTextNode("Up");

		control.href = "#";                 // so browser shows it as link
		control.className = "buttonup";
		control.title = "Pan Up";
		control.appendChild(controlText);
		Seadragon.Utils.addEvent(control, "click", this.onPanUp);
		return control;
	},

	this.panDownButton = function()
	{
		var control = document.createElement("a");
		var controlText = document.createTextNode("Down");

		control.href = "#";                 // so browser shows it as link
		control.className = "buttondown"
		control.title = "Pan Down";
		control.appendChild(controlText);
		Seadragon.Utils.addEvent(control, "click", this.onPanDown);
		return control;

	},

	//These functions set the panning for left, right, up, down.
	this.onPanLeft = function(event)
	{
		that.viewer.viewport.panBy(new Seadragon.Point(0.1, 0));
		Seadragon.Utils.cancelEvent(event);
	},

	this.onPanRight = function()
	{
		that.viewer.viewport.panBy(new Seadragon.Point(-0.1, 0));
		Seadragon.Utils.cancelEvent(event);
	},

	this.onPanUp = function()
	{
		that.viewer.viewport.panBy(new Seadragon.Point(0, -0.1));
		Seadragon.Utils.cancelEvent(event);
	},

	this.onPanDown = function()
	{
		that.viewer.viewport.panBy(new Seadragon.Point(0, 0.1));
		Seadragon.Utils.cancelEvent(event);
	},

	this.changeDocument = function(dzi)
	{
		if(dzi)
		{
			this.viewer.openDzi(dzi);
		}
		else
		{
			this.viewer.close();
		}
	},

	this.init();
}