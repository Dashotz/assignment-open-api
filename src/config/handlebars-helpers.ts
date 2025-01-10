import * as hbs from 'hbs';

export function registerHelpers() {
  hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });
} 