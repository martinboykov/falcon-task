import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumList',
})
export class EnumListPipe implements PipeTransform {
    transform(value: any): any {
        const items: any[] = [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const isValueProperty = +key >= 0;

                if (!isValueProperty) {
                    continue;
                }
                items.push({ key: +key, value: value[+key] });
            }
        }
        return items;
    }
}
