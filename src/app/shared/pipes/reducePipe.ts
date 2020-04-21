import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reducePipe',
    pure: false
})
export class ReducePipe implements PipeTransform {

    transform(items: any[], filter: any): any {
        console.log(filter);
        if (typeof (filter) === 'undefined' || this.isEmpty(filter)) {
            return items;
        }

        if (!items || !filter) {
            return items;
        }

        for (const key in filter) {
            console.log(filter[key]);
            if (key === 'project' && filter['project'] !== 'all') {
                items = items.filter(item => item.project.need.title === filter.project);
            }

            if (key === 'resource' && filter['resource'] !== 'all') {
                items = items.filter(item => item.user.firstname === filter.resource);
            }

            console.log(items);
        }

        return items;

    }

    isEmpty(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
}
