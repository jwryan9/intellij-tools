var gulp;

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';

describe('gulp', () => {
    let sandbox,
        bumpStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        bumpStub = sandbox.stub();
        gulp = proxyquire('../../../src/utils/gulp/gulp', {
            './bump': bumpStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('bumping', () => {
        beforeEach(() => {
            gulp.bump();
        });

        it('should bump', () => {
            expect(bumpStub).to.have.callCount(1);
            expect(bumpStub).to.be.calledWithExactly();
        });
    });
});
