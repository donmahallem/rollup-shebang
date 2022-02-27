/*
 * Package @donmahallem/rollup-plugin-shebang
 * Source https://github.com/donmahallem/rollup-plugin-shebang/
 */

import MS from 'magic-string';
import type { NormalizedOutputOptions, OutputBundle, OutputChunk, Plugin } from 'rollup';

interface IShebangOptions {
    shebang: string;
}
/**
 * @param options
 */
function shebangPlugin(options: IShebangOptions = { shebang: '#!/usr/bin/env node' }): Plugin {
    return {
        generateBundle(outputOptions: NormalizedOutputOptions, bundle: OutputBundle, isWrite: boolean) {
            for (const key of Object.keys(bundle)) {
                if (bundle[key].type !== 'chunk') {
                    return;
                }
                const chunk: OutputChunk = bundle[key] as OutputChunk;
                if (chunk.isEntry === true) {
                    const prefix = `${options.shebang}\n`;
                    if (!chunk.map) {
                        chunk.code = `${prefix}${chunk.code}`;
                    }
                    const s: MS = new MS(chunk.code);
                    s.prepend(prefix);
                    chunk.code = s.toString();
                    chunk.map = s.generateMap({ hires: true });
                }
            }
        },
        name: 'plugin-shebang',
    };
}
export { shebangPlugin, shebangPlugin as default };
