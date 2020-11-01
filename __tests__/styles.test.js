/** @format */

'use strict';

const fs = require('fs/promises');
const globby = require('globby');
const path = require('path');
const stylelint = require('stylelint');

const config = require('../index');
const accepted = globby.sync('**/accept/*.css');
const rejected = globby.sync('**/reject/*.css');

describe('styles', () => {
  describe('accept', () => {
    accepted.forEach((file) => {
      const filename = path.basename(file);
      const ruleName = file.match('/styles/(.*)/accept/')[1];

      test(`${ruleName} - ${filename}`, async () => {
        const code = await fs.readFile(file, 'utf-8');
        const { results } = await stylelint.lint({ code, config });
        const { warnings } = results[0];

        expect(warnings).not.toContainEqual(
          expect.objectContaining({ rule: ruleName, severity: 'error' }),
        );
      });
    });
  });

  describe('reject', () => {
    rejected.forEach((file) => {
      const filename = path.basename(file);
      const ruleName = file.match('/styles/(.*)/reject/')[1];

      test(`${ruleName} - ${filename}`, async () => {
        const code = await fs.readFile(file, 'utf-8');
        const { results } = await stylelint.lint({ code, config });
        const { warnings } = results[0];

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings).toContainEqual(
          expect.objectContaining({ rule: ruleName, severity: 'error' }),
        );
      });
    });
  });
});
