# typesetter-toy
# goals  
every project really has to start from a 'hello world'.  
before you can begin adding purposeful lines of code to a project, it's really important to have   
a body of known conditions where you know:   
everything important is loading  
you can push debugging information to your console or logfiles  
whatever libraries or APIs you're using behave in the way their documentation claims.  

for typesetter-toy, our ambitions were aggressively scoped down:  
Produce a html document that displays the same content on phone, chrome, and firefox.  
Produce a canvas object that displays the same effects at runtime on phone, chrome, and firefox.  
Write a function to select frames from within a spritesheet and plot them according to some routine.  
# timeline
typesetter-toy began development on 8/19/2020 as "empty document.html".  
typesetter-toy took an hour of free time betewen 1800 and 1915 on 8/23/2020,  
morphing between "heccing owo world.html and "debutton".  
    most of this time was apparently spent resolving script load order issues to guarantee the javascript  
	governing the canvas object only started after the html document completely loaded.  
typesetter-toy took another 1-3 hours on 8/28/2020.  
    this time was spent implementing and then debugging a map connecting letters to spritesheet indices;  
	possibly fewer than 10 minutes were spent on logic or adding LoC.  
typesetter-toy took another 1 hour on 8/29/2020,  
    as the final issues with canvas rendering were bashed out  
    and the final structure of the program fell into place.  
typesetter-toy lost another 2-3 hours to feature creep on 8/31/2020,  
    as superfluous features like text wrap-around, comments, jokes,   
	and punctuation support were considered, added, and fitfully removed.    
    also a complete monospaced bitmap font.  
# results
typesetter-toy was clearly intended to be a 2-day weekend auto-pedagogy covering the basics of the html5 canvas API.  
within one week, it turned into an experiment in using the map data structure, anonymous functions,   
bitmap font creation, text layout logic, and strategies for self-hosting static web content.  

since the project finished within 1 month of the expected 2-day project horizon, I consider this a stunning success  
in time management, scope-creep-mitigation, and time management.  Especially since the final product works!  
# instructions for use
like all of the early-SQCU autopedagogies circa 2020, running typesetter-toy is easy!  
  
1:Pull the repository.  
2:Load the repo's html file (in this case, asswad_II.html) in your favorite web browser.  
3:Enjoy!  


