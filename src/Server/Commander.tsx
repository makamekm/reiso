import * as rl from 'readline';

import * as Translation from '../Modules/Translation';

export type Command = {
  description: string
  action: (read: rl.ReadLine, callback: Function) => void
}

export class Commander {

  private read: rl.ReadLine

  private commands: { [name: string]: Command }

  constructor(commands: { [name: string]: Command }) {
    this.commands = commands;

    this.commands.q = {
      description: Translation.transDefault('Commander.q.Description'),
      action: (read, callback) => {
        read.close();
        process.exit();
      }
    };

    this.commands.help = {
      description: Translation.transDefault('Commander.help.Description'),
      action: (read, callback) => {
        console.log(Translation.transDefault('Commander.help.Inline.Commands'));
        console.log('');

        for (var name in commands) {
          console.log(Translation.transDefault('Commander.help.Inline.Name', name));
          console.log(Translation.transDefault('Commander.help.Inline.Description', commands[name].description));
          console.log('');
        }

        callback();
      }
    };

    this.read = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public cycle() {
    this.read.question(Translation.transDefault('Commander.EnterCommand'), (answer) => {
      for (var name in this.commands) {
        if (name == answer) {
          this.commands[name].action(this.read, this.cycle.bind(this));
          return;
        }
      }
      this.cycle();
    });
  }
}