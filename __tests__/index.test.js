/** @format */

'use strict';

const stylelint = require('stylelint');

const configuration = require('../index');

describe('configuration', () => {
  const code = `
    a {
      top: 0;
      color: red;
    }
  `;

  it('should not report errors', async () => {
    const { errored } = await stylelint.lint({
      code,
      config: {
        rules: [],
      },
    });

    expect(errored).toBe(false);
  });

  it('should report errors', async () => {
    const { errored } = await stylelint.lint({
      code,
      config: configuration,
    });

    expect(errored).toBe(true);
  });
});
