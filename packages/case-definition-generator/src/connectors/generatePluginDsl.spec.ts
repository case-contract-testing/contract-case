import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { CaseConfigurationError } from '@contract-case/case-plugin-base';

import { generatePluginDsl } from './generatePluginDsl';
import { loadDslPlugin } from './pluginModules';

const quietLogger = { info: () => {} };

describe('generatePluginDsl', () => {
  describe('with a plugin that declares a DSL', () => {
    let outputDir: string;

    beforeAll(() => {
      outputDir = mkdtempSync(join(tmpdir(), 'case-generator-spec-'));
      return generatePluginDsl(
        ['@contract-case/test-dsl-plugin-fixture'],
        ['java', 'ts'],
        outputDir,
        quietLogger,
      );
    });

    afterAll(() => {
      rmSync(outputDir, { recursive: true, force: true });
    });

    it('writes the Java class in the conventional location', () => {
      const javaFile = join(
        outputDir,
        'src',
        'main',
        'java',
        'io',
        'contract_testing',
        'contractcase',
        'dsl',
        'matchers',
        'examples',
        'AnyUlid.java',
      );
      expect(existsSync(javaFile)).toBe(true);
      const content = readFileSync(javaFile, 'utf-8');
      expect(content).toContain('public class AnyUlid');
      expect(content).toContain('"testfixture:AnyUlid"');
    });

    it('writes the TypeScript file in the conventional location', () => {
      const tsFile = join(
        outputDir,
        'src',
        'boundaries',
        'dsl',
        'matchers',
        'examples',
        'anyUlid.ts',
      );
      expect(existsSync(tsFile)).toBe(true);
      const content = readFileSync(tsFile, 'utf-8');
      expect(content).toContain("'testfixture:AnyUlid'");
    });
  });
});

describe('loadDslPlugin', () => {
  it('rejects a plugin that declares no DSL', () =>
    expect(
      loadDslPlugin('@contract-case/test-dsl-plugin-fixture/no-dsl'),
    ).rejects.toThrow("doesn't have a 'dsl' property"));

  it('rejects a package that is not installed', () =>
    expect(
      loadDslPlugin('@contract-case/definitely-not-a-real-plugin'),
    ).rejects.toThrow(CaseConfigurationError));

  it('rejects an unsafe module specifier', () =>
    expect(loadDslPlugin('../not/a/package')).rejects.toThrow(
      'Unsafe plugin module specifier',
    ));
});
