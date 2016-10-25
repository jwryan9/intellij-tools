var dbd;

import logLevel from '../src/utils/log-level';
import logger from '../src/utils/logger';
import git from '../src/utils/git/git';
import shell from '../src/utils/shell';
import argumentReader from '../src/utils/argument-reader';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import {common} from 'deere-ui-test-utils';

import proxyquire from 'proxyquire';

describe('dbd', () => {
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
        sandbox.stub(git, 'dieBranchesDie');
        sandbox.stub(shell, 'execute');
        sandbox.stub(argumentReader, 'read');

        ensureOnVpnStub = sandbox.stub();

        dbd = proxyquire('../src/die-branches-die', {
            './utils/ensure-on-vpn': ensureOnVpnStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when dbd is called', () => {
        let givenArgs;

        beforeEach(() => {
            givenArgs = common.any.string();
            dbd.main(givenArgs);
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

        it('should print that we are about to dbd the project', () => {
            expect(logger.warn).to.have.callCount(1);
            expect(logger.warn).to.be.calledWithExactly('Going to remove all dead branches');
        });

        it('should kill dead branches', () => {
            expect(git.dieBranchesDie).to.have.callCount(1);
            expect(git.dieBranchesDie).to.be.calledWithExactly();
        });
    });

});
