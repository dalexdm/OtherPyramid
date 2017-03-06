        //canvas size dependent variables
        var maxWidth = view.size.width * 2 - 50;
        var teir1Width = maxWidth / 20 - 4;
        var peak = view.size.height * 0.12;
        var gap = 22;
        var noto = maxWidth / 4;
        var teir1 = view.size.height * 0.3;
        var foodCorner = new Point(noto - teir1Width/2 - 2, teir1);
        var foodCorner2 = new Point(noto + teir1Width/2, teir1);
        var teir2 = teir1 * 2 + gap;
        var percent = 0.5;

        //image preparations
        var stalk = new Raster('stalk');
        stalk.position = view.center;
        stalk.scale(0.14);
        var sym = new Symbol(stalk);
        var syms = [50];
        for (var i = 0; i < 50; i++) {
            syms[i] = sym.place(0,0);
        }

        var meat = new Raster('meat');
        meat.position = view.center;
        meat.scale(0.12);
        var sym2 = new Symbol(meat);
        var syms2 = [6];
        for (var i = 0; i < 6; i++) {
            syms2[i] = sym2.place(0,0);
        }

        var curt = new Raster('curt');
        curt.position = view.center;
        curt.scale(0.12);
        var sym3 = new Symbol(curt);
        var syms3 = [12];
        for (var i = 0; i < 12; i++) {
            syms3[i] = sym3.place(0,0);
        }

        var purs = new Raster('purs');
        purs.position = new Point(noto, peak - 15)
        purs.scale(0.16);



        var text = new PointText(new Point(noto + maxWidth/9 + gap,teir1 + gap * .75));
        text.justification = 'left';
        text.fillColor = "#aaaaaa";
        text.fontFamilty = "Open Sans";
        var text2 = new PointText(new Point(noto + maxWidth/9 + gap,peak - gap * .75));
        text2.justification = 'left';
        text2.fillColor = "#aaaaaa";
        text2.fontFamilty = "Open Sans";
        var text3 = new PointText(new Point(noto + maxWidth/9 + gap,teir2 + gap * .75));
        text3.justification = 'left';
        text3.fillColor = "#aaaaaa";
        text3.fontFamilty = "Open Sans";

        var text34 = new PointText(new Point(noto,view.size.height));
        text34.justification = 'center';
        text34.fillColor = "#aaaaaa";
        text34.fontFamilty = "Open Sans";
        text34.content = "50% : MEAT EVERY MEAL"

        //path prep
        var meatEat = new Path();
        meatEat.fillColor = '#D36237';
        meatEat.add(noto - 2,peak);
        meatEat.add(foodCorner);
        meatEat.add(new Point(noto - 2, teir1));

        var plantEat = new Path();
        plantEat.fillColor = '#A8BA4E';
        plantEat.add(noto + 2, peak);
        plantEat.add(foodCorner2);
        plantEat.add(new Point(noto + 2, teir1));

        var meatGrow = new Path();
        meatGrow.fillColor = '#F08F6C';
        meatGrow.add(foodCorner + new Point(0,gap));
        meatGrow.add(noto - 2,teir1 + gap);
        meatGrow.add(noto + teir1Width - 4, teir2);
        meatGrow.add(foodCorner.x - teir1Width, teir2);

        var plantGrow = new Path();
        plantGrow.fillColor = '#A8BA4E';
        plantGrow.add(foodCorner2 + new Point(0,gap));
        plantGrow.add(noto + 2,teir1 + gap);
        plantGrow.add(noto + teir1Width, teir2);
        plantGrow.add(foodCorner2.x + teir1Width, teir2);

        resize(percent);

        //importSVG("stalk.svg", function () {var a = 5;});

        function resize (thePercent) {
        percent = thePercent;
        //regrow top of pyramid
            //clear now invalid points
            meatEat.removeSegment(3);
            plantEat.removeSegment(3);
            //calculate meat percent
            var meatEatWidth = percent * teir1Width;
            var plantWidth = teir1Width - meatEatWidth;
            var meatPoint = foodCorner + new Point (meatEatWidth,0);
            //add new top
            meatEat.add(meatPoint);
            plantEat.add(meatPoint + new Point(4,0));
            
        //regrow bottom
            //remove invalid bottom coords (3/4)
            for (var i = 0; i < 5; i++) {
                meatGrow.removeSegment(2);
                plantGrow.removeSegment(2);
            }

            //calculate useful dimensions
            var feedWidth = meatEatWidth * 8;
            var bottomWidth = feedWidth + plantWidth;
            var cornerPoint = new Point(noto - bottomWidth / 2, teir2);
            //in case of 0 meat, don't draw any red/orange
            if (percent >= 0.001) {
                meatGrow.add(meatPoint + new Point(0, gap));
                meatGrow.add(cornerPoint + new Point(feedWidth, 0));
                meatGrow.add(cornerPoint);
            }
            //fill plant side
            plantGrow.add(plantEat.lastSegment.point + new Point(0,gap));
            var plantLeft = cornerPoint + new Point(feedWidth, 0) + new Point(4,0);
            plantGrow.add(plantLeft);
            plantGrow.add(cornerPoint + new Point(bottomWidth,0));

            //icons - stalk
            for (var i = 0; i < syms.length; i++) {
                if (i * 12 > feedWidth || feedWidth < 1) {
                    if (i * 12 + 7 < bottomWidth) syms[i].position=cornerPoint + new Point(i*12 + 12, gap);
                    else syms[i].position=cornerPoint + new Point(0, gap);
                } else {
                    syms[i].position=cornerPoint + new Point(i*12,gap);
                }
            }
            //icons - meat
            for (var i = 0; i < syms2.length; i++) {
                if (i * 12 > meatEatWidth || meatEatWidth < 1) {
                    syms2[i].position= new Point(-10, -10);
                } else {
                    syms2[i].position=foodCorner + new Point(i*12,gap/2);
                }
            }
            //icons - curt
            for (var i = 0; i < syms3.length; i++) {
                if (i * 12 > plantWidth) {
                    syms3[i].position= new Point(-10, -10);
                } else {
                    syms3[i].position= meatPoint + new Point(i*12 + 7,gap/2);
                }
            }

            text.content = 'YOUR FOOD: 2000kcal';
            text2.content = 'YOU';
            text3.content = 'TOTAL CROPS GROWN: ' + Math.floor((bottomWidth / teir1Width) * 2000) + 'kcal';

            var textNum = Math.floor(percent * 100);
            if (textNum > 34) textNum += '% : MEAT AT LEAST EVERY MEAL';
            else if (textNum >= 22) textNum += '% : MEAT AT LEAST TWICE A DAY';
            else if (textNum >= 11) textNum += '% : MEAT AT LEAST ONCE A DAY';
            else if (textNum >= 5) textNum += '% : MEAT AT LEAST EVERY OTHER DAY';
            else if (textNum >= 1) textNum += '% : MEAT AT LEAST ONCE A WEEK';
            else textNum += '% : MEAT-FREE';
            text34.content = textNum;

            //graphResize(percent);
        }


        var globalElem;
        function makeSlider() {
            globalElem = document.querySelector('.boob');
            var init = new Powerange(globalElem, {callback: resizeAll, klass:'butt', decimal:true, min:0 , max:1, start:0});
        }

        function resizeAll () {
            resize(0.5 - globalElem.value / 2);
            window.graphResize(0.5 - globalElem.value / 2);
        }

        window.onload = makeSlider();
