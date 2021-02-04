import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: any, filterTask: string, filterCategory: string): any {
    if (value.length == 0 || (filterTask == '' && filterCategory == "All")) {
      return value;
    }
    // console.log(filterCategory, "Filter");
    let filteredTaskList = [];
    for (let task of value) {
      if (task.title.toLowerCase().indexOf(filterTask) !== -1 || task.title.indexOf(filterTask) !== -1) {
        if (filterCategory == "All") {
          filteredTaskList.push(task);
        } else if (task.category == filterCategory) {
          filteredTaskList.push(task);
        }
      }
    }

    return filteredTaskList;
  }

}
