        //Base Data (2007)
        var data = [
        ['Year', 'Pop',      'Res',          'Herb',         'Feed',         'Livestock'],
        [1970,   203.302,    93821.3081,     137663.5744,    137663.5744,    626147.0255],
        [1980,   226.542,    104546.2749,    153400.2689,    153400.2689,    697723.5809],
        [1990,   248.718,    114780.2191,    168416.4882,    168416.4882,    766023.1374],
        [2000,   282.385,    130317.1149,    191213.704,     191213.704,     869713.6663],
        [2015,   321.37,     148308.2005,    217611.9413,    217611.9413,    989783.0301],
        [2020,   334.5,      154367.5299,    226502.7675,    226502.7675,    1030221.936],
        [2025,   347.34,     160293.0279,    235197.2235,    235197.2235,    1069767.675],
        [2030,   359.4,      165858.5657,    243363.5116,    243363.5116,    1106911.103],
        [2035,   370.34,     170907.2377,    250771.4048,    250771.4048,    1140605.058],
        [2040,   380.22,     175466.7331,    257461.5314,    257461.5314,    1171034.333],
        [2045,   389.39,     179698.5724,    263670.8898,    263670.8898,    1199276.89],
        [2050,   398.33,     183824.2696,    269724.5063,    269724.5063,    1226811.073],
        [2055,   407.41,     188014.575,     275872.9223,    275872.9223,    1254776.439],
        [2060,   416.8,      192347.9416,    282231.2511,    282231.2511,    1283696.571]];

        var mData = [14];
        for (var i = 0; i < data.length; i++) {
            mData[i] = data[i].slice(0);
        }

        //canvas size dependent variables
        var botLeft = new Point(view.size.width * 0.125, view.size.height * 0.8);
        var gWidth = view.size.width * 0.5;
        var gHeight = view.size.height * 0.75;

        function getPoint(year, value) {
            var x = ((year - 1970) / 90) * gWidth;
            var y = (value / 2000000) * gHeight;
            return botLeft + new Point(x,-y);
        }

        /*var text = new PointText(new Point(0,0);
        text.justification = 'left';
        text.fillColor = "#aaaaaa";
        text.fontFamilty = "Open Sans";
        text.justification = 'left';*/

        //path prep
        var plantDisplay = new Path();
        plantDisplay.fillColor = '#A8BA4E';
        var meatDisplay = new Path();
        meatDisplay.fillColor = '#D36237';
        var feedDisplay = new Path();
        feedDisplay.fillColor = '#F08F6C';

        //axis labels
        for (var i = 0; i < 15; i++) {
            var text = new PointText(getPoint(data[1][0] + 6 * i, -100000));
            text.justification = 'left';
            text.fillColor = "#aaaaaa";
            text.fontFamilty = "Open Sans";
            text.scaling = [0.7,0.7];
            text.content = data[1][0] + 6*i;
            if (i > 9) continue;
            var text = new PointText(getPoint(1969, 215000 * i - 100000));
            text.justification = 'right';
            text.fillColor = "#aaaaaa";
            text.fontFamilty = "Open Sans";
            text.scaling = [0.7,0.7];
            text.content = 0.21 * i;
        }

        var Xtext = new PointText(getPoint(1960, 950000));
            Xtext.justification = 'center';
            Xtext.fillColor = "#aaaaaa";
            Xtext.fontFamilty = "Open Sans";
            Xtext.rotation = -90;
            Xtext.scaling = [.7,.7];
            Xtext.content = "AGRICULTURAL LAND USAGE\n(BILLIONS OF ACRES)";

        var chartXaxis = new Path();
        chartXaxis.add(getPoint(1970, 0));
        chartXaxis.add(getPoint(2060,0));
        chartXaxis.strokeColor = '#AAA';
        chartXaxis.strokeWidth = 1;

        var chartYaxis = new Path();
        chartYaxis.add(getPoint(1970, 0));
        chartYaxis.add(getPoint(1970, 1900000));
        chartYaxis.strokeColor = '#AAA';
        chartYaxis.strokeWidth = 1;

        //benchmarks
        //top line
        var landAmt = new Path();
        landAmt.strokeColor = '#AAA';
        landAmt.strokeWidth = 1;
        landAmt.add(getPoint(1970,1900000));
        landAmt.add(getPoint(2060,1900000));
        landAmt.dashArray = [2,2];
        var landAmt = new Path();
        landAmt.strokeColor = '#FFF';
        landAmt.strokeWidth = 1;
        landAmt.add(getPoint(1970,1900000) + new Point(2,0));
        landAmt.add(getPoint(2060,1900000));
        landAmt.dashArray = [2,2];
        var text = new PointText(getPoint(2061,1920000));
        text.justification = 'left';
        text.fillColor = "#aaaaaa";
        text.scaling = [.65,.65];
        text.fontFamilty = "Open Sans";
        text.content = "TOTAL LAND AREA\nMAINLAND USA";

        //bottom line
        var nowAgri = new Path();
        nowAgri.strokeColor = '#AAA';
        nowAgri.strokeWidth = 1;
        nowAgri.add(getPoint(1970,1010900));
        nowAgri.add(getPoint(2060,1010900));
        nowAgri.dashArray = [2,2];
        var nowAgri = new Path();
        nowAgri.strokeColor = '#FFF';
        nowAgri.strokeWidth = 1;
        nowAgri.add(getPoint(1970,1010900) + new Point(2,0));
        nowAgri.add(getPoint(2060,1010900));
        nowAgri.dashArray = [2,2];
        var text = new PointText(getPoint(2061,1010900));
        text.justification = 'left';
        text.fillColor = "#aaaaaa";
        text.scaling = [.65,.65];
        text.fontFamilty = "Open Sans";
        text.content = "CURRENT TOTAL\nAGRI USAGE";

        //usaImgs
        var lan = new Raster('usaLand');
        lan.position = new Point(view.size.width * 0.8425, view.size.height * 0.5);
        lan.scaling = new Point(0.25);
        var foo = new Raster('usaFood');
        foo.position = new Point(view.size.width * 0.8425, view.size.height * 0.5);
        foo.scaling = new Point(0.30);

        var text2 = new PointText(new Point(view.size.width * 0.8425, view.size.height * 0.75));
        text2.justification = 'center';
        text2.fillColor = "#aaaaaa";
        text2.scaling = [.8,.8];
        text2.fontFamilty = "Open Sans";
        text2.content = "2060 AGRICULTURAL\nLAND USAGE";

        window.graphResize = function (percent) {

        //fix mData
            for (var i = 1; i < 15; i++) {
                mData[i][3] = data[i][3] * (1-percent) * 2;
                mData[i][5] = data[i][5] * percent * 2 + mData[i][3];
                mData[i][4] = data[i][4] * percent * 2 + mData[i][5];
                foo.scaling = new Point(mData[i][4] / 1900000 * 0.25);
            }

        //clear now invalid points
            for (var i = 0; i < data.length * 2; i++) {
                plantDisplay.removeSegment(0);
                feedDisplay.removeSegment(0);
                meatDisplay.removeSegment(0);
            }

        //repopulate points
            //residential doesn't change
            //plant
            for (var i = 1; i < 15; i++) {
                plantDisplay.add(getPoint(data[i][0], mData[i][3]));
                feedDisplay.add(getPoint(data[i][0], mData[i][5]));
                meatDisplay.add(getPoint(data[i][0], mData[i][4]));
            }

            for (var i = 14; i > 0; i--) {
                plantDisplay.add(getPoint(data[i][0], 0));
                meatDisplay.add(getPoint(data[i][0], mData[i][3]));
                feedDisplay.add(getPoint(data[i][0], mData[i][4]));
            }
        }

        window.graphResize(0.5);