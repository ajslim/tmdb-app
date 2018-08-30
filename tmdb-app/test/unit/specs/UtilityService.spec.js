import Utility from '@/services/UtilityService';

describe('UtilityService', () => {
  it('should correctly execute the intersection function', () => {
    expect(Utility.intersection([1, 2], [1, 3])[0]).to.equal([1][0]);
    expect(Utility.intersection([1, 2], [3, 4]).length()).to.equal(0);
  });
});
