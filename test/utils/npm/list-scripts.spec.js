var run,
    chance;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

import Chance from 'chance';
chance = new Chance();

describe('listing out npm scripts', () => {
    let sandbox,
        expectedReturnedResult;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        expectedReturnedResult = chance.string();
        sandbox.stub(shell, 'execute').returns(expectedReturnedResult);

        run = proxyquire('../../../src/utils/npm/list-scripts', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when listing out all known npm scripts', () => {
        let actualResult;

        beforeEach(() => {
            actualResult = run();
        });

        it('should shell out and list out all known npm scripts', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('npm run');

            expect(actualResult).to.equal(expectedReturnedResult);
        });
    });
});
