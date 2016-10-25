import context from '../../src/utils/context';
import {expect} from 'chai';
import {common} from 'deere-ui-test-utils';

describe('context', () => {
    let key,
        value;

    beforeEach(() => {
        key = common.any.string();
        value = common.any.string();
        context.put(key, value);
    });

    it('should save to the context', () => {
        expect(context.get(key)).to.equal(value);
    });
});
