import { message } from '../message';

describe('message', () => {
  it.each([
    [
      'only data is set',
      undefined,
      {
        content: 'Hello world',
      },
      {
        content: 'Hello world',
      },
    ],
    ['only id is set', 'id', undefined, 'id'],
    [
      'id and data is set',
      'id',
      {
        content: 'Hello world',
      },
      {
        data: {
          content: 'Hello world',
        },
        id: 'id',
      },
    ],
  ])('should create the correct message when %s', (_, id, data, expected) => {
    const result = message({
      data,
      id,
    });

    expect(result).toEqual(expected);
  });

  it('should throw an error if no message is set', () => {
    expect(() => {
      message({});
    }).toThrow('Invalid message input');
  });
});
