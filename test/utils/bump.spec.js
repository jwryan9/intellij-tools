var bump,
    chance;

import npm from '../../src/utils/npm/npm';
import gulp from '../../src/utils/gulp/gulp';
import logger from '../../src/utils/logger';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, {expect} from 'chai';

import proxyquire from 'proxyquire';

import Chance from 'chance';
chance = new Chance();

describe('bump', () => {
    var sandbox,
        givenBumpType;

    before(() => {
        chai.use(sinonChai);
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        sandbox.stub(npm, 'bump');
        sandbox.stub(npm, 'listScripts');
        sandbox.stub(gulp, 'bump');
        sandbox.stub(logger, 'debug');

        bump = proxyquire('../../src/utils/bump', {});

        givenBumpType = chance.string();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('when bumping via gulp', () => {
        beforeEach(() => {
            npm.listScripts.returns('');
            bump(givenBumpType);
        });

        it('should decide bump via gulp', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('bumping via gulp');

            expect(gulp.bump).to.have.callCount(1);
            expect(gulp.bump).to.be.calledWithExactly(givenBumpType);

            expect(npm.bump).to.have.callCount(0);
        });
    });

    describe('when bumping via npm', () => {
        beforeEach(() => {
            npm.listScripts.returns(
                'Lifecycle scripts included in ' + chance.word() + ':\n' +
                '  start\n' +
                '    build-tasks start --type devServer\n' +
                '  test\n' +
                '    build-tasks test\n' +
                '\n' +
                'available via `npm run-script`:\n' +
                '  build\n' +
                '    build-tasks js\n' +
                '  bump\n' +
                '    build-tasks bump\n' +
                '  eslint\n' +
                '    build-tasks eslint\n' +
                '  gh-pages\n' +
                '    build-tasks js --clean false --config webpack.config.gh-pages.js\n' +
                '  lint\n' +
                '    npm run eslint && npm run stylelint\n' +
                '  stylelint\n' +
                '    build-tasks stylelint\n' +
                '  verify\n' +
                '    npm run lint && build-tasks validate-module && build-tasks coverage\n'
            );

            bump(givenBumpType);
        });

        it('should decide bump via npm', () => {
            expect(logger.debug).to.have.callCount(1);
            expect(logger.debug).to.be.calledWithExactly('bumping via npm');

            expect(npm.bump).to.have.callCount(1);
            expect(npm.bump).to.be.calledWithExactly(givenBumpType);

            expect(gulp.bump).to.have.callCount(0);
        });
    });
});
