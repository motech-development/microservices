import {
  calculateOrderBy,
  calculatePages,
  calculateSkip,
  calculateTake,
} from '../pagination.utils';

describe('pagination.utils', () => {
  describe('calculateTake', () => {
    it.each([
      [10, 10],
      [50, '1000'],
      [5, 2],
    ])('should return %i when %i is set', (expected, take) => {
      const result = calculateTake(take);

      expect(result).toEqual(expected);
    });
  });

  describe('calculateSkip', () => {
    it.each([
      [0, 1, 2],
      [10, '2', 10],
      [45, 10, 5],
    ])(
      'should skip %i when returning %i page and taking %i items',
      (expected, page, take) => {
        const result = calculateSkip(page, take);

        expect(result).toEqual(expected);
      },
    );
  });

  describe('calculateOrderBy', () => {
    it.each([
      [
        'asc',
        'name',
        {
          name: 'asc',
        },
      ],
      [
        'desc',
        'email',
        {
          email: 'desc',
        },
      ],
      ['asc', undefined, {}],
    ])(
      'should return correct order when direction is %s and sorted by %s',
      (dir, sortBy, expected) => {
        const result = calculateOrderBy(dir, sortBy);

        expect(result).toEqual(expected);
      },
    );
  });

  describe('calculatePages', () => {
    it.each([
      [0, 0, 0],
      [2, 20, 10],
      [2, 6, 5],
    ])(
      'should return %i when total is %i and limit is %i',
      (expected, total, limit) => {
        const result = calculatePages(total, limit);

        expect(result).toEqual(expected);
      },
    );
  });
});
