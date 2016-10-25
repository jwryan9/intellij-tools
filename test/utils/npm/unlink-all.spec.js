var unlinkAll,
    chance;

import shell from '../../../src/utils/shell';
import logger from '../../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';
import _ from 'lodash';

import Chance from 'chance';
chance = new Chance();

describe('unlinkAll', () => {
    let sandbox;

    //Builds something like the following.

    // dwisnowski ~/Developer/boilerplate/boilerplate-app (master) $ npml
    // boilerplate-app@0.0.0 /Users/dwisnowski/Developer/boilerplate/boilerplate-app
    // ├── boilerplate-server-core@0.0.0 -> /Users/dwisnowski/Developer/boilerplate/boilerplate-server-core invalid
    // ├── boilerplate-ui-core@0.0.0 -> /Users/dwisnowski/Developer/boilerplate/boilerplate-ui-core invalid
    // ├── config@1.21.0
    // ├── deere-ui-build-tasks@8.2.0
    // ├── deere-ui-test-utils@3.0.2
    // ├── gulp@3.9.1
    // ├── mocha@2.5.3
    // ├── open@0.0.5
    // ├── proxyquire@1.7.10
    // ├── react@0.14.8
    // ├── react-dom@0.14.8
    // ├── sinon@1.17.6
    // └── supervisor@0.6.0
    function buildDepString(depNamesToUnlink) {
        let depStringsToUnlink = depNamesToUnlink.map((depToUnlink) => {
                return '├── ' + depToUnlink + '@' + chance.integer({min: 0, max: 9}) + '.0.0 -> ' + chance.word();
            }),
            depStringsUnlinkedAlready = _.times(chance.integer({min: 2, max: 10}), () => {
                return '├── ' + chance.word() + '@' + chance.integer({min: 0, max: 9}) + '.0.0';
            }),
            depString = _.shuffle(depStringsToUnlink.concat(depStringsUnlinkedAlready)).join('\n');

        return 'boilerplate-app@0.0.0 /Users/dwisnowski/Developer/boilerplate/boilerplate-app' + '\n' + depString;
    }

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(shell, 'execute');
        sandbox.stub(shell, 'executeAndCaptureErrors');
        sandbox.stub(process, 'exit');
        sandbox.stub(logger, 'err');

        unlinkAll = proxyquire('../../../src/utils/npm/unlink-all', {});
    });

    afterEach(() => {
        sandbox.restore();
    });


    describe('when installing fails due to invalid dep', () => {
        beforeEach(() => {
            shell.execute.withArgs('npm list --depth=0').returns(buildDepString([]));

            shell.executeAndCaptureErrors.returns({
                results: '',
                error: chance.word() + ' invalid' + chance.word()
            });

            unlinkAll();
        });

        it('should log an error and exit', () => {
            expect(logger.err).to.have.callCount(1);
            expect(logger.err).to.be.calledWithExactly('failed to npm install all deps. run npml to find out what is wrong.');

            expect(process.exit).to.have.callCount(1);
            expect(process.exit).to.be.calledWithExactly(1);
        });
    });

    describe('when installing fails due to dep cant be found', () => {
        beforeEach(() => {
            shell.execute.withArgs('npm list --depth=0').returns(buildDepString([]));

            shell.executeAndCaptureErrors.returns({
                results: '',
                error: chance.word() + ' 404 Not Found' + chance.word()
            });

            unlinkAll();
        });

        it('should log an error and exit', () => {
            expect(logger.err).to.have.callCount(1);
            expect(logger.err).to.be.calledWithExactly('failed to npm install all deps. run npml to find out what is wrong.');

            expect(process.exit).to.have.callCount(1);
            expect(process.exit).to.be.calledWithExactly(1);
        });
    });

    describe('when unlinking from all npm links', () => {
        let depsToUnlink;

        function generateDepsToUnlink() {
            let depNames = [];

            _.times(chance.integer({min: 2, max: 10}), () => {
                depNames.push(chance.word());
            });

            return depNames;
        }

        beforeEach(() => {
            let npmlString;

            shell.executeAndCaptureErrors.returns({
                results: '',
                error: ''
            });

            depsToUnlink = generateDepsToUnlink();
            npmlString = buildDepString(depsToUnlink);

            shell.execute.withArgs('npm list --depth=0').returns(npmlString);

            unlinkAll();
        });

        it('should shell out and unlinkAll', () => {
            depsToUnlink.forEach((depToUnlink) => {
                expect(shell.execute).to.be.calledWithExactly('npm unlink ' + depToUnlink);
            });
        });
    });
});
