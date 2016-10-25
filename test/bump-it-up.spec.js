var bumpItUp,
    chance;

import git from '../src/utils/git/git';
import npm from '../src/utils/npm/npm';

import logLevel from '../src/utils/log-level';
import logger from '../src/utils/logger';
import shell from '../src/utils/shell';
import argumentReader from '../src/utils/argument-reader';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';
import {common} from 'deere-ui-test-utils';

import proxyquire from 'proxyquire';

import Chance from 'chance';
chance = new Chance();

const NO = 'Blue pill \<Exits\>',
    YES = 'Red pill \<Bumps!\>',
    BUNNY =
        '                                 ' + '\n'
        + '                          .|.    ' + '\n'
        + '                         /  |    ' + '\n'
        + '                        /  /     ' + '\n'
        + '                       / ,|      ' + '\n'
        + '           .-------.--- /        ' + '\n'
        + '          |._ __.-/ o. o\        ' + '\n'
        + '                 (    Y  )       ' + '\n'
        + '                  )     /        ' + '\n'
        + '                 /     (         ' + '\n'
        + '                /       Y        ' + '\n'
        + '            .-|         |        ' + '\n'
        + '           /  _     \    \       ' + '\n'
        + '          /    |. |. ) /| )      ' + '\n'
        + '         Y       )( / /(,/       ' + '\n'
        + '        ,|      /     )          ' + '\n'
        + '       ( |     /     /           ' + '\n'
        + '        \` \_  (__   (__         ' + '\n'
        + '            \`-._,)--._,)        ' + '\n'
        + '                                 ' + '\n'
        + 'Down the hole we go!';

describe('bump it up', () => {
    let sandbox,
        promptThenStub,
        bumpStub,
        promptStub,
        ensureOnVpnStub;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(logLevel, 'setLogLevel');
        sandbox.stub(logger, 'trace');
        sandbox.stub(logger, 'warn');
        sandbox.stub(shell, 'execute');
        sandbox.stub(argumentReader, 'read');
        sandbox.spy(console, 'log');
        sandbox.stub(process, 'exit');

        sandbox.stub(git, 'update');
        sandbox.stub(git, 'ensureOnMaster');
        sandbox.stub(npm, 'install');
        sandbox.stub(npm, 'prune');
        sandbox.stub(npm, 'unlinkAll');

        ensureOnVpnStub = sandbox.stub();
        promptThenStub = sandbox.stub();
        promptStub = sandbox.stub().returns({then: promptThenStub});
        bumpStub = sandbox.stub();

        bumpItUp = proxyquire('../src/bump-it-up', {
            './utils/ensure-on-vpn': ensureOnVpnStub,
            'inquirer': {prompt: promptStub},
            './utils/bump': bumpStub
        });
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when bumpItUp is called', () => {
        let givenArgs;

        beforeEach(() => {
            givenArgs = common.any.string();
            bumpItUp.main(givenArgs);
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

        it('should print that we are about to bumpItUp the project', () => {
            expect(logger.warn).to.have.callCount(1);
            expect(logger.warn).to.be.calledWithExactly('Going to bump it up');
        });

        it('should prompt user for input', () => {
            expect(promptStub).to.have.callCount(1);
            expect(promptStub).to.be.calledWithExactly([
                {
                    name: 'bumpType',
                    message: 'Enter the version bump type:',
                    type: 'list',
                    choices: ['Major', 'Minor', 'Patch']
                },
                {
                    name: 'areYouSure',
                    message: '\n\nYou take the blue pill, the story ends.\n'
                    + 'You wake up in your bed and believe whatever you want to believe.\n'
                    + 'You take the red pill, you stay in Wonderland,\n'
                    + 'and I show you how deep the rabbit hole goes.\n',
                    type: 'list',
                    choices: [NO, YES]
                }
            ]);
        });

        describe('when the user responds with a continue onward', () => {
            let bumpType;

            beforeEach(() => {
                bumpType = chance.word() + chance.word().toUpperCase() + chance.word();
                promptThenStub.getCall(0).args[0](
                    {
                        areYouSure: YES,
                        bumpType: bumpType
                    }
                );
            });
            it('should run the main bump stuff', () => {
                expect(console.log).to.have.callCount(1); //eslint-disable-line no-console
                expect(console.log).to.be.calledWithExactly(BUNNY); //eslint-disable-line no-console

                expect(git.ensureOnMaster).to.have.callCount(1);
                expect(git.ensureOnMaster).to.be.calledWithExactly();

                expect(npm.unlinkAll).to.have.callCount(1);
                expect(npm.unlinkAll).to.be.calledWithExactly();
                expect(npm.unlinkAll).to.be.calledAfter(git.ensureOnMaster);

                expect(git.update).to.have.callCount(1);
                expect(git.update).to.be.calledWithExactly();
                expect(git.update).to.be.calledAfter(npm.unlinkAll);
                expect(git.update).to.be.calledAfter(git.ensureOnMaster);

                expect(npm.prune).to.have.callCount(1);
                expect(npm.prune).to.be.calledWithExactly();
                expect(npm.prune).to.be.calledAfter(git.update);
                expect(npm.prune).to.be.calledAfter(npm.unlinkAll);
                expect(npm.prune).to.be.calledAfter(git.ensureOnMaster);

                expect(npm.install).to.have.callCount(1);
                expect(npm.install).to.be.calledWithExactly();
                expect(npm.install).to.be.calledAfter(git.update);
                expect(npm.install).to.be.calledAfter(npm.prune);
                expect(npm.install).to.be.calledAfter(npm.unlinkAll);
                expect(npm.install).to.be.calledAfter(git.ensureOnMaster);

                expect(bumpStub).to.have.callCount(1);
                expect(bumpStub).to.be.calledWithExactly(bumpType.toLowerCase());
                expect(bumpStub).to.be.calledAfter(git.update);
                expect(bumpStub).to.be.calledAfter(npm.prune);
                expect(bumpStub).to.be.calledAfter(npm.install);
                expect(bumpStub).to.be.calledAfter(npm.unlinkAll);
                expect(bumpStub).to.be.calledAfter(git.ensureOnMaster);
            });
        });

        describe('when the user responds with a lets get the heck out of here.', () => {
            beforeEach(() => {
                promptThenStub.getCall(0).args[0]({areYouSure: NO});
            });
            it('should print the bunny', () => {
                expect(process.exit).to.have.callCount(1); //eslint-disable-line no-process
                expect(process.exit).to.be.calledWithExactly(0); //eslint-disable-line no-process
            });
        });
    });
});
