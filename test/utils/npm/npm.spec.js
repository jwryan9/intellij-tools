var npm;

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import proxyquire from 'proxyquire';

describe('npm', () => {
    let sandbox,
        pruneStub,
        unlinkAllStub,
        bumpStub,
        listScriptsStub,
        installStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        installStub = sandbox.stub();
        pruneStub = sandbox.stub();
        unlinkAllStub = sandbox.stub();
        bumpStub = sandbox.stub();
        listScriptsStub = sandbox.stub();
        npm = proxyquire('../../../src/utils/npm/npm', {
            './install': installStub,
            './prune': pruneStub,
            './unlink-all': unlinkAllStub,
            './bump': bumpStub,
            './list-scripts': listScriptsStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('installing', () => {
        beforeEach(() => {
            npm.install();
        });

        it('should call to install', () => {
            expect(installStub).to.have.callCount(1);
            expect(installStub).to.be.calledWithExactly();
        });
    });
    describe('pruning', () => {
        beforeEach(() => {
            npm.prune();
        });

        it('should call to pruning', () => {
            expect(pruneStub).to.have.callCount(1);
            expect(pruneStub).to.be.calledWithExactly();
        });
    });
    describe('unlinkingall', () => {
        beforeEach(() => {
            npm.unlinkAll();
        });

        it('should call to unlink all npm deps', () => {
            expect(unlinkAllStub).to.have.callCount(1);
            expect(unlinkAllStub).to.be.calledWithExactly();
        });
    });
    describe('bump', () => {
        beforeEach(() => {
            npm.bump();
        });

        it('should call to bump', () => {
            expect(bumpStub).to.have.callCount(1);
            expect(bumpStub).to.be.calledWithExactly();
        });
    });
    describe('list scripts', () => {
        beforeEach(() => {
            npm.listScripts();
        });

        it('should call to list known npm scripts', () => {
            expect(listScriptsStub).to.have.callCount(1);
            expect(listScriptsStub).to.be.calledWithExactly();
        });
    });
});
