export class DollarsFormatValueConverter {
  toView(value) {
    return `$${value}`;
  }

  fromView(value) {
    return value.substring(1);
  }
}

