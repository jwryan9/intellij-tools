let updateScript;

import logLevel from '../src/utils/log-level';
import logger from '../src/utils/logger';
import git from '../src/utils/git/git';
import npm from '../src/utils/npm/npm';
import shell from '../src/utils/shell';
import argumentReader from '../src/utils/argument-reader';
import context from '../src/utils/context';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import {common} from 'deere-ui-test-utils';

import proxyquire from 'proxyquire';

describe('updateScript Unit Tests', () => {
    let sandbox,
        ensureOnVpnStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(logLevel, 'setLogLevel');
        sandbox.stub(logger, 'trace');
        sandbox.stub(logger, 'warn');
        sandbox.stub(git, 'update');
        sandbox.stub(npm, 'install');
        sandbox.stub(shell, 'execute');
        sandbox.stub(argumentReader, 'read');
        sandbox.stub(context, 'get');

        ensureOnVpnStub = sandbox.stub();

        updateScript = proxyquire('../src/update-script', {
            './utils/ensure-on-vpn': ensureOnVpnStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when update called with install true', () => {
        let givenArgs;

        beforeEach(() => {
            context.get.withArgs('install').returns(true);

            givenArgs = common.any.string();
            updateScript.main(givenArgs);
        });

        it('should ensure on VPN', () => {
            expect(ensureOnVpnStub).to.have.callCount(1);
            expect(ensureOnVpnStub).to.be.calledWithExactly();
        });

        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(logLevel.LOG_LEVEL.ERR);
        });

        it('should read the input args', () => {
            expect(argumentReader.read).to.have.callCount(1);
            expect(argumentReader.read).to.be.calledWithExactly(givenArgs);
        });

        it('should print that we are about to update the project', () => {
            expect(logger.warn).to.have.callCount(2);
            expect(logger.warn).to.be.calledWithExactly('Updating your project... Sit back and watch me go !!!');
        });

        it('should print that we are about to update the project', () => {
            expect(logger.warn).to.have.callCount(2);
            expect(logger.warn).to.be.calledWithExactly('installing node modules');
        });


        it('should update', () => {
            expect(git.update).to.have.callCount(1);
            expect(git.update).to.be.calledWithExactly();
        });

        it('should npm install', () => {
            expect(npm.install).to.have.callCount(1);
            expect(npm.install).to.be.calledWithExactly();
            expect(npm.install).to.be.calledAfter(git.update);
        });
    });

    describe('when update called with install false', () => {
        let givenArgs;

        beforeEach(() => {
            context.get.withArgs('install').returns(false);

            givenArgs = common.any.string();
            updateScript.main(givenArgs);
        });

        it('should ensure on VPN', () => {
            expect(ensureOnVpnStub).to.have.callCount(1);
            expect(ensureOnVpnStub).to.be.calledWithExactly();
        });

        it('should set the default logging level', () => {
            expect(logLevel.setLogLevel).to.have.callCount(1);
            expect(logLevel.setLogLevel).to.be.calledWithExactly(logLevel.LOG_LEVEL.ERR);
        });

        it('should read the input args', () => {
            expect(argumentReader.read).to.have.callCount(1);
            expect(argumentReader.read).to.be.calledWithExactly(givenArgs);
        });

        it('should print that we are about to update the project', () => {
            expect(logger.warn).to.have.callCount(1);
            expect(logger.warn).to.be.calledWithExactly('Updating your project... Sit back and watch me go !!!');
        });

        it('should update', () => {
            expect(git.update).to.have.callCount(1);
            expect(git.update).to.be.calledWithExactly();
        });

        it('should not npm install', () => {
            expect(npm.install).to.have.callCount(0);
        });
    });
});

describe('updatescript Integration Test', () => {
    it('should ', () => {

    });
});
