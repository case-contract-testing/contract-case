/*
 * Vitest runs test files in worker processes whose stdout is a pipe, not a
 * TTY. Colour libraries (chalk / supports-color) therefore decide that colour
 * is unsupported and strip all ANSI codes from ContractCase's log output, even
 * though vitest forwards that output to a colour-capable terminal.
 *
 * Jest avoids this because jest-worker injects `FORCE_COLOR=1` into its worker
 * environment. Vitest does not, so we do the equivalent here.
 *
 * This module must be imported before anything that (transitively) loads
 * chalk, because supports-color reads FORCE_COLOR at module load time.
 */
import supportsColor from 'supports-color';

const alreadyConfigured =
  process.env['FORCE_COLOR'] !== undefined ||
  process.env['NO_COLOR'] !== undefined;

if (process.env['VITEST'] && !alreadyConfigured) {
  // Ask what the inherited environment (TERM, COLORTERM, CI vendor etc.)
  // would support if we *were* attached to a TTY. This keeps colour off for
  // TERM=dumb, unknown CI logs and similar.
  const detected = supportsColor.supportsColor({ isTTY: true });
  if (detected && detected.level > 0) {
    process.env['FORCE_COLOR'] = String(detected.level);
  }
}
