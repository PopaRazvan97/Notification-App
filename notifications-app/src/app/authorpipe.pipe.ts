import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authorpipe'
})
export class AuthorpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return 'By Author:  ' + value;
  }
}
