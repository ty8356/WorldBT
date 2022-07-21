import { Injectable } from '@angular/core'
import * as Color from 'color';

@Injectable({
providedIn: 'any'
})

export class ColorHelperService {    

    constructor() {

    }

    getColor(index: number) {

        const NUM_SECTIONS: number = 6;
        const MAX_RGB: number = 255;

        var section = Math.floor(index * NUM_SECTIONS);
        var start = (index - (section / NUM_SECTIONS)) * NUM_SECTIONS; // index from start of section (0-1)
        var end = 1 - start; // index from end of section (0-1)

        var colorArray: number[] = []; // the rgb color array with colors that range from 0-1.
        switch (section) {
            case 0:
            colorArray = [1, start, 0];
            break;
            case 1:
            colorArray = [end, 1, 0];
            break;
            case 2:
            colorArray = [0, 1, start];
            break;
            case 3:
            colorArray = [0, end, 1];
            break;
            case 4:
            colorArray = [start, 0, 1];
            break;
            case 5:
            colorArray = [1, 0, end];
            break;
        }

        // Return the color
        return Color.rgb(colorArray.map(function(value) {
            return value * MAX_RGB;
        }));

    }

    Rainbow(numberOfColors: number) {
        if (numberOfColors < 0) {
            throw 'Number of colors must be non-negative';
        } else if (typeof numberOfColors == 'undefined') {
            throw 'You must have a number of colors per rainbow cycle.';
        } else {
            var rainbow = [];
            for (var i = 0; i < numberOfColors; ++i) {
                rainbow[i] = this.getColor(i / numberOfColors);
            }
            return rainbow;
        }
    }

    RainbowCreate(numberOfColors: number) {
        if (numberOfColors < 0) {
            throw 'Number of colors must be non-negative';
          } else if (typeof numberOfColors == 'undefined') {
            throw 'You must have a number of colors per rainbow cycle.';
          } else {
            var rainbow = [];
            for (var i = 0; i < numberOfColors; ++i) {
              rainbow[i] = this.getColor(i / numberOfColors);
            }
            return rainbow;
          }
    }
}