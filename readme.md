[![Build Status](https://travis-ci.org/hoveytech/ng2-power-table.svg?branch=master)](https://travis-ci.org/hoveytech/ng2-power-table)

# Power Table

Power Table is table module for Angular 2 that is based on a great module, [Smart Table](https://github.com/lorenzofox3/Smart-Table), for AngularJS. Since I couldn't find Smart-Table written for Angular 2 I am making my own attempt.

# Usage

Simple usage:

`ptTable` is required parent directive. Other directives/components prefixed with `pt` depend on `ptTable`. In the simple example below `ptTable` is provided the full array of customers (one-way binding into the directive). Internally the directive filters/sorts/pages the array and returns it using `ptDisplayArray` (one-way binding out of the directive).

```
<table [ptTable]="allCustomers" (ptDisplayArray)="customers">
    <thead>
        <tr>
            <th ptSort="id">Id<th>
            <th ptSort="name">Name<th>
            <th>Open Invoices<th>
        </tr>
    </thead>
    <tbody>
        <tr ngFor="#c of customers">
            <td>{{c.id}}</td>
            <td>{{c.name}}</td>
            <td>{{c.invoices}}</td>
        </tr>
    </tbody>
</table>
```

## Test

Run `npm install` then `npm run test`

## License

Power Table module is under MIT license:

> Copyright (C) 2016 Hovey Tech LLC.
>
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation files
> (the "Software"), to deal in the Software without restriction,
> including without limitation the rights to use, copy, modify, merge,
> publish, distribute, sublicense, and/or sell copies of the Software,
> and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
> BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
> ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
