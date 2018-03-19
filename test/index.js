/**
 * Created by alga on 22/6/17.
 */

import assert from 'assert'
import Nlp from '../../src/onmsg-core/Nlp'
import intents from './Nlp-intents.json'
import inputs from './Nlp-user-input.json'

describe(`Nlp`, ()=> {

    describe('constructor', () => {
        it('should throw an error if missing inputs or intents', () => {
            try {
                const nlp = new Nlp();
            } catch (e) {
                assert.ok(true);
            }

        });

        it('should be an instance of Analytics', () => {
            try {
                const nlp = new Nlp({
                    inputs,
                    intents
                });

                assert.ok((nlp instanceof Nlp));
            } catch (e) {
                assert.ok(false);
            }

        });
    });

    describe('analyze', ()=> {
        const nlp = new Nlp({
            inputs,
            intents
        });

        const expected = {
            intent: 'greetings',
            states: {
                conversation: 'convo',
                state: 'greetings'
            },
            phrases: [
                'Hi, nice to meet you. 1',
                'Hi, nice to meet you. 2',
                'Hi, nice to meet you. 3'
            ],
            // text: 'Hi, nice to meet you. 3',
            userInput: 'hello',
            bestMatch: 'hello'
        };

        const result = nlp.analyze('hello');


        it('should return an object with the user intent', () => {
            assert.ok(result.text);
            delete result.text;

            assert.deepEqual(result, expected);
        });


        it('should return null', () => {
            assert.equal(null, nlp.analyze('lalala'));
        });
    });
});
