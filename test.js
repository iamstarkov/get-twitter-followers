import { equal } from 'assert';
import getTwitterFollowers from './index';

it('should getTwitterFollowers', () =>
  equal(getTwitterFollowers('unicorns'), 'unicorns'));

it('should getTwitterFollowers invalid input', () =>
  equal(getTwitterFollowers(), undefined));
