window.onload = function() {
/*	2020-08-31
	Exciting typing error fixed after all these days.  I can hardly believe it myself.
		[ ]Handle out of range characters ()_+,.<>/?:";'[]{} etc.  map fullstop to 水?
		[ ]Handle extreme bizarro characters that i could not predict e.g. yurokeyboard examples?
			-input.split('')	//returns array of all chars in list
			-charMap.has(character)  // returns true / false
			-array.reduce(callback(), []).foreach();
			callback(accum, curr){
				if(charMap.has(curr)){	//if a missing map value is repeated in the input only adds once
					continue;
				}
				else{
					accum.push(curr);  //ought to be a list of unique not yet present chars
				}
			}
*/
//instantiate necessary 2d graphics shit
var canban = document.getElementById("yonCanvas");
var contex = canban.getContext("2d");
var sheet = document.getElementById("hivis"); 
var canWidth = canban.width;
var canHeight = canban.height;

//var frame = {img:sheet, sx:0, sy:0, swidth:32, sheight:32, xpos:100, ypos:100}; //A is for A
function Frame(img, sx, sy, swidth, sheight) {
this.img = img;
this.sx = sx;
this.sy = sy;
this.swidth = swidth;
this.sheight = sheight;
this.width = swidth; //scaling factor width
this.height = sheight; //scaling factor height
}

function Coords(xpos, ypos){ //I feel most comfortable storing game data in a different object to avoid duplication of image data
this.xpos = xpos;
this.ypos = ypos;
}


//constants brapped here
//map pairing "letter" to "spritesheet coordinates and scale"
const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//const frameWidth = "32";
var charMap = new Map();
//exceptionFrame ought to be a 4px wide stripe of transparent 'nothing' located at 0,64->4,96
const exceptionFrame = new Frame(sheet, 4, 64, 4, 32);
const schwayFrame = new Frame(sheet, 32, 64, 32, 32);

for (let i=0; i<alph.length; i++){	//key:pair of letter:spritesheet coordinates.
//charMap.set(alph.charAt(i),{sx: (i%13)*frameWidth, sy: Math.floor(i/13)*frameWidth, swidth: frameWidth, sheight: frameWidth});
const frameWidth = 32;
charMap.set(alph.charAt(i), new Frame(sheet, (i%13)*frameWidth, Math.floor(i/13)*frameWidth, frameWidth, frameWidth));
}
charMap.set(".", schwayFrame);	//水 happens here

//so yeah what happens if someone vomits emoji into my beautiful text parser.
//if they're cool, fullstops are transmuted into gold. literal gold.
//for everythign else the "exceptionFrame" of a 4px wide visually empty placeholder is sampled from the fontsheet
//and then added to the character map datatype so that if they call it again it just draws blank yknow so yeah
//update: this function is honestly kind of disgusting.
function inputValidation(input){	
input.toUpperCase().split('').reduce(( accum, curr ) =>{
	if(charMap.has(curr)){	//if a missing map value is repeated in the input only adds once
		return accum;	
	}
	else{
		if (accum.includes(curr)){
			console.log("duplicate character?:"+curr);
			return accum;
		}
		else{
			accum.push(curr);  //ought to be a list of unique not yet present chars
			console.log("anomalous character detected:"+curr);
			return accum;
		}
	}
},[]).forEach(char=>{
	charMap.set(char, exceptionFrame);
});
}

function draw(frame, coords) { //pass frame data and also the html5 canvas context so it can be drawn on
contex.drawImage(frame.img, frame.sx, frame.sy, frame.swidth, frame.sheight, coords.xpos, coords.ypos, frame.swidth, frame.sheight);
//console.log("drawn at "+coords.xpos+","+coords.ypos+".");
}

function typesetter(string, coords){	//ok so like, why the fuck does it newline after each word? why? [HISTORIC COMMENT DO NOT REMOVE]
inputValidation(string);
let whitespace = charMap.get("A").swidth;
string = string.toUpperCase();
string.split(' ').forEach(word => {
	word.split('').forEach(letter => {
	let frameWidth = charMap.get(letter).swidth;
	let frameHeight = charMap.get(letter).sheight;
	//VILE IMPERMISSIBLE HARDCODE in memoriam vile hardcode 2020-2020 you were in our lives for such a brief moment but you meant so much :(
	if (coords.xpos+frameWidth>canWidth){
		coords.xpos=0;
		coords.ypos=coords.ypos+frameHeight;
		//console.log("current letter is: "+letter+" and ypos: "+coords.ypos);
	}
	draw(charMap.get(letter), coords);
	coords.xpos=coords.xpos+frameWidth;
	});
coords.xpos=coords.xpos+whitespace;
console.log("Space plotted at "+coords.xpos/whitespace+" Ms of text"); //stinky hardcode removed yay!
});

}  //holy shit will this even work

//prints ASSWAD
const coordsA = new Coords(100, 0);
console.log(coordsA.xpos+","+coordsA.ypos); //you know how it is
typesetter(".ASSWAD.", coordsA);

let asswadPrime = new Coords(50, 64);
//typesetter("ASSWAD II THE SEQUEL TO ASSWAD COMING TO THEATERS THIS SUMMER TWENTY TWELVE", asswadPrime);
//let input = "good luck no clue what Im looking at there"
let input = "i am absolutely ,./<>🤢🤢🤢🤢?STYMIED by the dynamic typing that allowed my early mistake to go unnoticed for such a long period of time";
console.log("requested: "+input);
typesetter(input, asswadPrime);
console.log("printed: "+input+".");
}; //end of onload function



/*	t. cadillion 2020-08-28
const toCopy = Object.entries(obj2);
toCopy.forEach(function (pair) {  
const key = pair[0];
const value = pair[1];
obj1[key] = value; // merges objects, obj2 overwrites  
obj1.key[key] = value; // inserts copy of object at obj1.key
  });
*/

/*"I use it for everything so I don't have to walk arrays all the time e.g.:" t. cadillion
array.filter(filterFunction).map(mapFunction);

array.reduce((accumulator, current) => {
	if (filterfunction(current)) return [...accumulator, mapFunction(current)];
	else return accumulator;
	},
	[]
);

/*

/*charsheet from range 0-32,0-32 inserted at coords 100,100
//prints ASSWAD
contex.drawImage(sheet, 0, 0, 32, 32, 100, 100, 32, 32);
contex.drawImage(sheet, 160, 32, 32, 32, 132, 100, 32, 32);
contex.drawImage(sheet, 160, 32, 32, 32, 164, 100, 32, 32);
contex.drawImage(sheet, 288, 32, 32, 32, 196, 100, 32, 32);
contex.drawImage(sheet, 0, 0, 32, 32, 228, 100, 32, 32);
contex.drawImage(sheet, 96, 0, 32, 32, 260, 100, 32, 32);
*/
/* commented out line plotting codeo
//contex.strokeStyle = "#E1A034";
//contex.moveTo(0,0);
//contex.lineTo(320, 320);
//contex.lineTo(480, 320);  //BRUH THIS ONE RUNS FROM 320,320 TO 320,480
//contex.lineTo(0, 0); 
//contex.stroke();
*/
/* commented out .drawImage function reference
	context.drawImage(img,sx,sy,swidth,sheight,x,y, width, height)
		img does what youd expect
		sx, sy are the coords in the base image where you start to clippity clip
		swidth, sheight are the lengths that are clipped from img
		x,y are the coords where the image is pasted in your canvas
		width, height are the scale the image will be pasted in at. MANDATORY.
	Let's guess: is the image placed so that the top left corner is drawn on x,y?
*/