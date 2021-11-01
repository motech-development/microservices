/** Message input. */
export interface IMessageInput<T> {
  /** Message payload. */
  data?: T;
  /** ID to accompany message. */
  id?: string;
}

export interface IMessageOutput<T> {
  /** Message payload. */
  data: T;
  /** ID to accompany message. */
  id: string;
}

/**
 * Creates a message object.
 *
 * @param input - The message to send.
 * @returns Message object.
 */
export function message<T>(
  input: IMessageInput<T>,
): IMessageOutput<T> | T | string {
  const { data, id } = input;

  if (data && id) {
    return {
      data,
      id,
    };
  }

  if (!data && id) {
    return id;
  }

  if (!id && data) {
    return data;
  }

  throw new Error('Invalid message input');
}
