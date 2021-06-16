import { css } from '@emotion/css';
import { createSerializer } from 'jest-emotion';
const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

expect.addSnapshotSerializer(createSerializer(css));

console.info = () => {};
