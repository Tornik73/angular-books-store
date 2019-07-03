import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tripledots'
})
export class TripleDotsPipe implements PipeTransform {
    transform(text: string, args?: any): string {

        if(text.length > 200)
            text = text.substr(0, 200) + "...";
        else
            text += "...";
        return text;
    }
}