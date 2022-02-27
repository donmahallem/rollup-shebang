/*
 * Package @donmahallem/rollup-plugin-shebang
 * Source https://github.com/donmahallem/rollup-plugin-shebang/
 */

import { expect } from 'chai';
import 'mocha';
import defaultConfig from './index';

describe('index', (): void => {
    it('should set all plugins with default config', (): void => {
        expect(defaultConfig).to.not.be.undefined;
    });
});
