window.onload = function() {
/*	2020-08-31
	Exciting typing error fixed after all these days.  I can hardly believe it myself.
		[X]Handle out of range characters ()_+,.<>/?:";'[]{} etc.  map fullstop to 水?
		[X]Handle extreme bizarro characters that i could not predict e.g. yurokeyboard examples?
	2020-09-01
		[X]Pruned excess comments
		[X]Populated remote repo
	2020-09-04
		[X]revised out of date comments
		[X]fixed execution order error
		[X]Interactive
*/

//instantiate necessary 2d graphics shit
var canban = document.getElementById("yonCanvas");
var contex = canban.getContext("2d");
var sheet = document.getElementById("hivis"); 
var canWidth = canban.width;
var canHeight = canban.height;


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

const coordsA = new Coords(172, 0);		//'title' line for printing centered fixed string 
const qcuPrime = new Coords(50, 64);	//interactive line is drawn from here to end of canvas

for (let i=0; i<alph.length; i++){	//key:pair of letter:spritesheet coordinates.
//charMap.set(alph.charAt(i),{sx: (i%13)*frameWidth, sy: Math.floor(i/13)*frameWidth, swidth: frameWidth, sheight: frameWidth});
const frameWidth = 32;
charMap.set(alph.charAt(i), new Frame(sheet, (i%13)*frameWidth, Math.floor(i/13)*frameWidth, frameWidth, frameWidth));
}
charMap.set(".", schwayFrame);	//水 happens here

/*	so yeah what happens if someone vomits emoji into my beautiful text parser.
	if they're cool, fullstops are transmuted into gold. literal gold.
	for everythign else the "exceptionFrame" of a 4px wide visually empty placeholder is sampled from the fontsheet
	and then added to the character map datatype so that if they call it again it just draws blank yknow so yeah
	update: this function is honestly kind of disgusting.
*/
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

function draw(frame, coords) { //pass frame data.
contex.drawImage(frame.img, frame.sx, frame.sy, frame.swidth, frame.sheight, coords.xpos, coords.ypos, frame.swidth, frame.sheight);
//console.log("drawn at "+coords.xpos+","+coords.ypos+".");
}

//typesetter is the function we call to draw things,
function typesetter(string, coords){	//ok so like, why the f*ck does it newline after each word? why? [HISTORIC COMMENT DO NOT REMOVE]
string = string.toUpperCase();
inputValidation(string);
let whitespace = charMap.get("A").swidth;	//probably a better way to do this
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

//event listener
document.getElementById("achey").addEventListener("click", acheyTea);

//print contents from form
function acheyTea(){
	let input=document.getElementById("formy").value
	let acheycoords = qcuPrime;
	console.log("requested: "+input);
	typesetter(input, acheycoords);
	console.log("printed: "+input+".");
}

//print too rude for g*thub
console.log(coordsA.xpos+","+coordsA.ypos); //you know how it is
typesetter(".QCU", coordsA);

//debug string containing invalid characters
//let input = "i am absolutely ,./<>🤢🤢🤢🤢?STYMIED by the dynamic typing that allowed my early mistake to go unnoticed for such a long period of time";
//console.log("requested: "+input);
//typesetter(input, qcuPrime);
//console.log("printed: "+input+".");
}; //end of onload function