/*  Autumn Greeting Card -- js */

(function($){
	'use strict';
    
	// declare actors here
    const backFallingLeaves = $('#brownLeaf, #orangeLeaf, #redLeaf'),
         textLine1 = $('.text-line-1'),
         textLine2 = $('.text-line-2'),
         textGreeting = $('.text-greeting'),
         treeLeaves = $('[id^=treeleaf]'),
         floorLeaves = $('[id^=floorleaf]'),
          bird = $('#Bird'),
          birdHat = bird.find('#BirdHat'),
          birdEyes = bird.find('#leftEye, #rightEye'),
          nest = $('#NestAndLeaves'),
          tree = $('#tree_trunk'),
          body = $('body'),
          cardContainer = $('.card.container');
	
    // clear stage 
    function clearStage() {
        const clearTl = new TimelineMax(); 
        clearTl
            .set(backFallingLeaves, {autoAlpha: 0})
            .set(textLine1, {autoAlpha: 0})
            .set(textLine2, {autoAlpha: 0})
            .set(treeLeaves, {autoAlpha: 0})
            .set(bird, {y:'+=65'})
            .set(nest, {autoAlpha: 0})
            .set(tree, {autoAlpha: 0})
            .set(textGreeting, {autoAlpha: 0})
            .set(floorLeaves, {y: '+=275', onComplete: showContainer});
        
            function showContainer() {
                cardContainer.css('display', 'block');
            }
        return clearTl;
    }


    // enter floor vegetation
     function enterFloorVegetation() {
         const fLeavesT = new TimelineMax();
        
         fLeavesT.staggerTo(floorLeaves, 1, {y:0, ease: Back.easeInOut}, 0.01)
         
                 .fromTo(tree,1, {scaleY: 0.2, autoAlpha:0, transformOrigin:'center bottom'}, 
                        {scale:1,autoAlpha:1,transformOrigin:'center bottom',ease: Back.easeInOut})

                 .fromTo(tree,0.9, {scaleX: 0.2, autoAlpha:0, transformOrigin:'center bottom'}, 
                        {scale:1,autoAlpha:1,transformOrigin:'center bottom', ease: Back.easeInOut}, '-=0.9')
         return fLeavesT;
     }


    // enter tree stuff
    function enterTreeStuff() {
        const treeStuffT = new TimelineMax();

        treeStuffT
            .staggerFromTo(treeLeaves, 0.5, {scale: 0.2, autoAlpha:0, transformOrigin:'center bottom'}, 
                {scale: 1, autoAlpha:1, transformOrigin:'center bottom'}, 0.02)
            .fromTo(nest, 0.95, {y:0, scale: 0.2, autoAlpha:0, transformOrigin:'center center'},
                 {y:'-=15', scale: 1, autoAlpha:1, transformOrigin:'center center', ease: Elastic.easeOut}, '+=0.1')  
            .to(nest, 0.3, {y:'+=15', ease: Bounce.easeOut}, '-=0.2')  
            .add('nest-pop-in')
            .set(birdHat, {rotation:12, x:'+=6'})
            .to(bird, 1.4, {y:'-=39', autoAlpha:1, ease: Power4.easeInOut},'nest-pop-in+=0.1')     
            .add('bird-peek')
            .set(birdEyes, {autoAlpha:0})
            .set(birdEyes, {autoAlpha:1}, '+=0.2')
            .set(birdEyes, {autoAlpha:0}, '+=0.2')
            .set(birdEyes, {autoAlpha:1}, '+=0.2')
            .add('bird-blinks')
            .to(bird, 0.8, {y:'-=34', ease: Power4.easeInOut})
            .to(bird, 0.3, {y:'+=8', ease: Back.easeInOut})
            .to(birdHat, 0.4, {y:'-=12'}, '-=0.6')
            .to(birdHat, 0.4, {y:0, rotation:0, x:0, onComplete: blinkLoop}, '-=0.3')
        ;

        function blinkLoop() {
            const birdBlinkLoop = new TimelineMax({repeat: -1, repeatDelay:4});
            
            birdBlinkLoop
            .set(birdEyes, {autoAlpha:0})
            .set(birdEyes, {autoAlpha:1}, '+=0.2')
            .set(birdEyes, {autoAlpha:0}, '+=1.2')
            .set(birdEyes, {autoAlpha:1}, '+=0.2')
            birdBlinkLoop
        }
        return treeStuffT;
    }


    // enter the greeting text
    function enterGreet() {
        const enterGreet = new TimelineMax();

        enterGreet
            .fromTo(textLine1, 1, {y:'-=50', autoAlpha:0 },
                {y:0, autoAlpha:1, onComplete: startLoops})
                .fromTo(textLine2, 1, {y:'-=25', autoAlpha:0 },
                {y:0, autoAlpha:1})    
                .staggerFromTo(textGreeting, 0.5, {scale:2, autoAlpha:0, transformOrigin:'center center'},
                    {scale:1, autoAlpha:1, transformOrigin:'center center'},0.1)

            function startLoops() {
                //start bg color loop
                const colors= ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
                const bgTimeline = new TimelineMax({repeat: -1, repeatDelay:2});

                bgTimeline
                    .to(body, 3, {backgroundColor: colors[0]})
                    .to(body, 3, {backgroundColor: colors[1]}, '+=2')
                    .to(body, 3, {backgroundColor: colors[2]}, '+=2')
                    .to(body, 3, {backgroundColor: colors[3]}, '+=2')

                ;


                //start falling leaves loop
                TweenMax.set(backFallingLeaves, {y:-100, autoAlpha:0.2});
                TweenMax.to("#brownLeaf", 10+Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: repeatFall, onCompleteParams:['#brownLeaf']});
                TweenMax.to("#redLeaf", 10+Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: repeatFall, onCompleteParams:['#redLeaf']});
                TweenMax.to("#orangeLeaf", 10+Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: repeatFall, onCompleteParams:['#orangeLeaf']});

                function repeatFall(leafId) {
                    let range = Math.random()*800,
                          offset= 400,
                          newX  = range - offset;  
                
                    TweenMax.set(leafId, {x:newX, y:-100, autoAlpha:0.2, rotation: Math.random()*360});
                    TweenMax.to(leafId, 10+Math.random()*10, {y:'+=1200', autoAlpha:1, ease: Linear.easeNone, onComplete: repeatFall, onCompleteParams:[leafId]});
                }    
            }        
        return enterGreet;
    }
	
	// the GO function ...to kick things all off
	function go() {
        console.log('go...')
        
        const masterT = new TimelineMax();
        
        masterT
            .add(clearStage(), 'scene-clear-stage')
            .add(enterFloorVegetation(), 'scene-floor-vegetation')
            .add(enterTreeStuff(), 'scene-enter-treestuff')
            .add(enterGreet(), 'scene-enter-greet')
        ;
    }

    

    go();

})(jQuery);


