// -*- mode: typescript; -*-
class Startup { 
    public static main(): number { 
        console.log('Page Hello');

        let muhammara = require('muhammara')

        var pdfWriter = muhammara.createWriter("page.pdf");
        var myfont = pdfWriter.getFontForFile('BLKCHCRY.TTF');
        var textOptions = {font:myfont, size:14, colorspace:'gray', color:0x00};

        var pathFillOptions = {
            color: 0xff000000,
            colorspace: "cmyk",
            type: "fill",
        };
        var pathStrokeOptions = { color: "DarkMagenta", width: 4 };
        
        for (var i = 0; i < 4; ++i) {
            var page = pdfWriter.createPage();
            page.mediaBox = [0, 0, 595, 842];
            var cxt = pdfWriter.startPageContentContext(page);
            cxt.writeText('Page ' + (i+1), 500, 25, textOptions)

            // drawPath
            cxt
                .drawPath(
                    [
                        [75, 640],
                        [149, 800],
                        [225, 640],
                    ],
                    pathFillOptions
                )
                .drawPath(
                    75,
                    540,
                    110,
                    440,
                    149,
                    540,
                    188,
                    440,
                    223,
                    540,
                    pathStrokeOptions
                );

            // drawSquare
            cxt
                .drawSquare(375, 640, 120, pathFillOptions)
                .drawSquare(375, 440, 120, pathStrokeOptions);

            // drawRectangle
            cxt
                .drawRectangle(375, 220, 50, 160, pathFillOptions)
                .drawRectangle(375, 10, 50, 160, pathStrokeOptions);

            // drawCircle
            cxt
                .drawCircle(149, 300, 80, pathFillOptions)
                .drawCircle(149, 90, 80, pathStrokeOptions);

            // writeText (writing labels for each of the shapes)
            cxt
                .writeText("Paths", 75, 805, textOptions)
                .writeText("Squares", 375, 805, textOptions)
                .writeText("Rectangles", 375, 400, textOptions)
                .writeText("Circles", 75, 400, textOptions);

            // image
            cxt
                .drawImage(375, 440,'moi.jpg',
                           {transformation:{width:120,height:120, proportional:true}}
                          );
            
            pdfWriter.writePage(page);
        }
        pdfWriter.end();
        return 0; 
    } 
} 

Startup.main();


