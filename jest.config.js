module.exports = {
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '(test.*|(\\.|/)(test|spec))\\.ts$',
  testEnvironment: 'node',
  moduleFileExtensions: [
		'js',
		'ts',
		'json'
  ],
  roots: [
		'<rootDir>/test/'
  ],
  coverageDirectory: 'test/coverage'
};
