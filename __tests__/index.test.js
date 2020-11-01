/** @format */

'use strict';

const stylelint = require('stylelint');

const config = require('../index');

describe('configuration', () => {
  it('should not report an error (correctly ordered properties)', async () => {
    const code = 'a {\n  top: 0;\n  color: red;\n}\n';

    const { errored } = await stylelint.lint({
      code,
      config,
    });

    expect(errored).toBe(false);
  });

  it('should report an error (incorrectly ordered properties)', async () => {
    const code = 'a {\n  color: red;\n  top: 0;\n}\n';

    const { errored, results } = await stylelint.lint({
      code,
      config,
    });

    const { warnings } = results[0];

    expect(errored).toBe(true);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].rule).toEqual('order/properties-order');
    expect(warnings[0].text).toContain('Expected "top" to come before "color"');
  });
});
