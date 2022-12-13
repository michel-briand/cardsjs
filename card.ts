// -*- mode: typescript; -*-

// objectif: imprimer une carte

type point = {
    x: number;
    y: number;
}

type rect = {
    x: number;
    y: number;
    w: number;
    h: number;
}

class Startup { 
    public static main(): number { 
        console.log('une carte... et bim !');

        let muhammara = require('muhammara')

        var pdfWriter = muhammara.createWriter("card.pdf");
       
        var page = pdfWriter.createPage();
        const page_h = 842;
        page.mediaBox = [0, 0, 595, 842];
        
        var cxt = pdfWriter.startPageContentContext(page);

        var colorfill_ext   = { color: 0xff000000, colorspace: "cmyk", type: "fill", };
        var colorfill_int   = { color: 0xffee0000, colorspace: "cmyk", type: "fill", };
        var colorfill_lbar  = { color: 0xffeeee00, colorspace: "cmyk", type: "fill", };
        var colorfill_illus = { color: 0xffeeeeee, colorspace: "cmyk", type: "fill", };
        var colorfill_txt   = { color: 0x00000055, colorspace: "cmyk", type: "fill", };

        // ne pas oublier que le repère cartésien de Postscript/PDF est
        // orienté du bas vers le haut alors que l'écran l'est du haut vers le bas
        const offset: point = { x: 15.663, y: 11.515 };
        const ext:    rect  = { x: offset.x, y: offset.y, w: 63.034, h: 87.969 };
        const int:    rect  = { x: ext.x+2.837, y: ext.y+2.794, w: 57.404, h: 82.423 };
        const lbar:   rect  = { x: ext.x+2.837, y: ext.y+2.794, w: 8.255, h: 82.423 };
        const illus:  rect  = { x: ext.x+13.039, y: ext.y+10.202, w: 45.762, h: 39.793 };
        const text:   rect  = { x: ext.x+13.716, y: ext.y+54.737, w: 44.577, h: 26.966 };
        
        const namefont = pdfWriter.getFontForFile('Cantarell-Bold.otf');
        const namefont_opt = { font: namefont, size: 8, colorspace:'gray', color: "white"};

        const textfont = pdfWriter.getFontForFile('Cantarell-Bold.otf');
        const textfont_opt = { font: textfont, size: 3, colorspace: 'gray', color: "black"};
        
        // canevas de la carte
        cxt
            .drawRectangle(ext.x, page_h - (ext.y+ext.h), ext.w, ext.h, colorfill_ext)
            .drawRectangle(int.x, page_h - (int.y+int.h), int.w, int.h, colorfill_int)
            .drawRectangle(lbar.x, page_h - (lbar.y+lbar.h), lbar.w, lbar.h, colorfill_lbar)
            .drawRectangle(illus.x, page_h - (illus.y+illus.h), illus.w, illus.h, colorfill_illus)
            .drawRectangle(text.x, page_h - (text.y+text.h), text.w, text.h, colorfill_txt)
        ;

        // le nom
        cxt
            .writeText('Coucou', int.x + 0, page_h - (int.y) - 5, namefont_opt)

        // l'image
        cxt
            .drawImage(illus.x, page_h - (illus.y+illus.h),'burning wrath.png',
                       {transformation:{width: illus.w, height: illus.h, proportional:true}}
                      );

        // le texte
        cxt
            .writeText('Le texte de la carte...', text.x + 2, page_h - (text.y) - 3, textfont_opt)
        // numéro de page
        var myfont = pdfWriter.getFontForFile('BLKCHCRY.TTF');
        var textOptions = {font: myfont, size:14, colorspace:'gray', color:0x00};
        cxt.writeText('Page 1', 500, 25, textOptions)
        
        pdfWriter.writePage(page);

        pdfWriter.end();
        return 0; 
    } 
} 

Startup.main();


