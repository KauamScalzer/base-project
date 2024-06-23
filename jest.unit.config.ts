import { Config } from 'jest';
import config from './jest.config'

const configUnit: Config = config
configUnit.testMatch = ['**/*.spec.ts']

export default configUnit;
