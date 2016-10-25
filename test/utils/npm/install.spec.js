var install;

import shell from '../../../src/utils/shell';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

describe('install', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');

        install = proxyquire('../../../src/utils/npm/install', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when installing', () => {
        beforeEach(() => {
            install();
        });

        it('should shell out and install', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly('npm i');
        });
    });
});
