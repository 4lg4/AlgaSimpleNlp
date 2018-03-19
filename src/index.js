/**
 * Created by www.Alga.me on 19/3/18.
 */

export default class Nlp {
  constructor(props = {}) {
    this.props = props;
    return this.analyze();
  }

  analyze(string) {
    string = string || this.props.input;

    if (!string) {
      return false;
    }

    const normalizedString = this._normalize(string);

    // direct match
    if (this.props.inputs[normalizedString]) {
      return Object.assign({}, this.props.intents[this.props.inputs[normalizedString]], {
        text: this._randomMessage(this.props.intents[this.props.inputs[normalizedString]].phrases),
        userInput: string,
        bestMatch: normalizedString
      });
    }

    // multiple matches
    const arrayToTest = this._stringToArray(normalizedString);
    const matches = {};

    for (let i = 0; i < arrayToTest.length; i++) {
      for (let key in this.props.inputs) {
        if (key.match(new RegExp(`\\b${arrayToTest[i]}\\b`))) {
          matches[key] = (!matches[key]) ? 1 : matches[key] + 1;
        }
      }
    }

    // get the best match
    let bestMatch = '';
    let bestMatchTotal = 0;
    for (let key in matches) {
      if (matches[key] > bestMatchTotal) {
        bestMatchTotal = matches[key];
        bestMatch = key;
      }
    }

    if (this.props.intents[this.props.inputs[bestMatch]] && ((1 / bestMatchTotal) > 0.33)) {
      return Object.assign({}, this.props.intents[this.props.inputs[bestMatch]], {
        text: this._randomMessage(this.props.intents[this.props.inputs[bestMatch]].phrases),
        input: string,
        bestMatch: bestMatch
      });
    }

    return null;
  }

  // private
  _randomMessage(messageList) {
    if (!messageList) {
      return false;
    }
    return messageList[Math.floor(Math.random() * ((messageList.length - 1) + 1))];
  }

  _normalize(string) {
    if (!string) {
      return false;
    }

    return string
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  _stringToArray(string) {
    if (!string) {
      return false;
    }

    return string.split(' ');
  }
}
