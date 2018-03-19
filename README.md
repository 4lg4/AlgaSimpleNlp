# AlgaSimpleNlp
Simple NLP module using regex and returning the user content based on a JSON training file


```javascript
  import Nlp from 'alga-simple-nlp';
  import inputs from './inputs.json';
  import intents from './intents.json';
  
  const nlp = new Nlp({
    inputs,
    intents
  })
  
  const analyzed = nlp.analyze('hello');
  
  // returns an object or null if not match
```


```javascript
```
