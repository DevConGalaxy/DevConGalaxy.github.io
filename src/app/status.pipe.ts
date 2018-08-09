import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(items: any[], status: string): any[] {
    if (!items) {
      return [];
    }
    if (!status) {
      return items;
    }
    
    return items.filter((it: any) => it.status === status);
  }

}
