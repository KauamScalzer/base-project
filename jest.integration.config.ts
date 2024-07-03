import { Config } from 'jest';
import config from './jest.config'

const configIntegration: Config = config
configIntegration.testMatch = ['**/*.test.ts']

export default configIntegration
