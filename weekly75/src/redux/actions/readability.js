import * as type from './actionType';

export function useReadability() {
  return {
    type: type.useReadability,
  };
}

export function dontUseReadability() {
  return {
    type: type.dontUseReadability,
  };
}
