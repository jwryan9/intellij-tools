var ensureOnVpn;

import shell from '../../src/utils/shell';
import logger from '../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import {common} from 'deere-ui-test-utils';

import proxyquire from 'proxyquire';

describe('ensureOnVpn', () => {
    let sandbox;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(logger, 'debug');
        sandbox.stub(logger, 'err');
        sandbox.stub(process, 'exit');

        ensureOnVpn = proxyquire('../../src/utils/ensure-on-vpn', {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when ensuring on vpn and On VPN', () => {
        let vpnCheckCommand;
        beforeEach(() => {
            vpnCheckCommand = 'curl -s --connect-timeout 3 --head https://github.deere.com | head -n 1 | grep "HTTP/1.[01] [23].."';
            shell.execute
                .withArgs(vpnCheckCommand)
                .returns(common.any.string() + ' Found');

            ensureOnVpn();
        });

        it('should shell out and ensureOnVpn', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly(vpnCheckCommand);

            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('isOnVpn: true');

            expect(logger.err).to.have.callCount(0);
        });
    });

    describe('when ensuring on vpn and OFF VPN', () => {
        let vpnCheckCommand;
        beforeEach(() => {
            vpnCheckCommand = 'curl -s --connect-timeout 3 --head https://github.deere.com | head -n 1 | grep "HTTP/1.[01] [23].."';
            shell.execute
                .withArgs(vpnCheckCommand)
                .returns(common.any.string());

            ensureOnVpn();
        });

        it('should shell out and ensureOnVpn', () => {
            expect(shell.execute).to.have.callCount(1);
            expect(shell.execute).to.be.calledWithExactly(vpnCheckCommand);

            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('isOnVpn: false');

            expect(logger.err).to.have.callCount(1);
            expect(logger.err).to.be.calledWithExactly('could not connect to Deere github.  Make sure you are on the VPN.');

            expect(process.exit).to.have.callCount(1);
            expect(process.exit).to.be.calledWithExactly(1);
        });
    });
});
