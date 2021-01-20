import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Input() title: string = 'Calculator';
  @Input('ref') count: any = '0';
  numberA: number = 0;
  numberB: number = 0;
  result: number = 0;
  consecutive: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(this.title);
  }


  // In retrospect, I probably should've split this into different methods, and used switches too instead of just ifs, 
  // would've been easier, more tidy, but oh well...
  Calc(value: string) {

    // if in consecutive action, keep the result number in numberB
    if (this.result != 0) {
      this.count = '0';
      this.numberA = 0;
      this.numberB = this.result;
      this.result = 0;
      this.consecutive = true;
    }

    // Seperate numberA as the one given before the operator and numberB who is given after the operator
    // Note: consecutive operations use numberA as second number and numberB as the number kept from previous operation

    // Only one operator may be at the start of the second number (probably should have used a seperate variable for the operator... oh well)
    // Unless the first operator is multiplication/division, in which case allow plus or minus operator to signify signed number
    if (value == '+') {
      if (this.count[0] != '+' && this.count[0] != '-' && this.count[0] != '*' && this.count[0] != '/') {
        this.numberA = this.count;
        this.count = '+';
      }
      else if(this.count[0] == '*' || this.count[0] == '/'){
        if (this.count[1] == '+' || this.count[1] == '-'){
          this.count = '+';
        }
        else{
          this.count += '+';
        }
      }
      else {
        this.count = '+';
      }
    }

    else if (value == '-') {
      if (this.count[0] != '+' && this.count[0] != '-' && this.count[0] != '*' && this.count[0] != '/') {
        this.numberA = this.count;
        this.count = '-';
      }
      else if(this.count[0] == '*' || this.count[0] == '/'){
        if (this.count[1] == '+' || this.count[1] == '-'){
          this.count = '-';
        }
        else{
          this.count += '-';
        }
      }
      else {
        this.count = '-';
      }
    }

    else if (value == '/') {
      if (this.count[0] != '+' && this.count[0] != '-' && this.count[0] != '*' && this.count[0] != '/') {
        this.numberA = this.count;
        this.count = '/';
      }
      else {
        this.count = '/';
      }
    }

    else if (value == '*') {
      if (this.count[0] != '+' && this.count[0] != '-' && this.count[0] != '*' && this.count[0] != '/') {
        this.numberA = this.count;
        this.count = '*';
      }
      else {
        this.count = '*';
      }
    }

    // As said before, if the operation is consecutive, use NumberA as the second number in operation
    else if (value == '=') {
      for (let i = 0; i < this.count.length; i++) {
        if (i == 0) {
          continue;
        }
        else {
          if (!this.consecutive) {
            if (this.numberB == 0) {
              this.numberB = this.count[i];
            }
            else {
              this.numberB = this.numberB + this.count[i];
            }
          }
          else {
            if (this.numberA == 0) {
              this.numberA = this.count[i];
            }
            else {
              this.numberA = this.numberA + this.count[i];
            }
          }
        }
      }
      if (!this.consecutive) {
        if (this.count[0] == '+') {
          this.result = +this.numberA + +this.numberB;
          this.count = this.result;
        }
        else if (this.count[0] == '-') {
          this.result = +this.numberA - +this.numberB;
          this.count = this.result;
        }
        else if (this.count[0] == '*') {
          this.result = +this.numberA * +this.numberB;
          this.count = this.result;
        }
        else if (this.count[0] == '/') {
          this.result = +this.numberA / +this.numberB;
          this.count = this.result;
        }
      }
      else {
        if (this.count[0] == '+') {
          this.result = +this.numberB + +this.numberA;
          this.count = this.result;
        }
        else if (this.count[0] == '-') {
          this.result = +this.numberB - +this.numberA;
          this.count = this.result;
        }
        else if (this.count[0] == '*') {
          this.result = +this.numberB * +this.numberA;
          this.count = this.result;
        }
        else if (this.count[0] == '/') {
          this.result = +this.numberB / +this.numberA;
          this.count = this.result;
        }
      }
      this.numberA = 0;
      this.numberB = 0;
    }

    // clear everything
    else if (value == 'AC') {
      this.count = '0';
      this.numberA = 0;
      this.numberB = 0;
      this.result = 0;
      this.consecutive = false;
    }

    // if number is default(0) just take the number that was input, else concatenate  it with previous one
    else {
      if (this.count == '0') {
        this.count = value;
      }
      else {
        this.count = this.count + value;
      }
    }

    console.log('numberA: ' + this.numberA);
    console.log('numberB: ' + this.numberB);
    console.log('count: ' + this.count);
  }
}