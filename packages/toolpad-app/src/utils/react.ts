import React from 'react';

export function createProvidedContext<T>(name: string) {
  const context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const maybeContext = React.useContext(context);
    if (!maybeContext) {
      throw new Error(`context "${name}" was used without a Provider`);
    }
    return maybeContext;
  };

  return [useContext, context.Provider] as const;
}

export function suspendPromise<T>(promise: Promise<T>): () => T {
  let status = 'pending';
  let error: Error;
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err: Error) => {
      status = 'error';
      error = err;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw error;
      default:
        return response;
    }
  };
}
