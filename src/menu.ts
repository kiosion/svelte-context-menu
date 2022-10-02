import { get, writable } from 'svelte/store';
import type { MenuState, MenuStateOption } from './types';

const key = {};

const state = writable<MenuState>({} as MenuState);

const setState = async (e?: MouseEvent, pageContainer?: HTMLElement) => {
  if (!e) {
    return state.set({
      ...get(state),
      open: false
    });
  }

  const target = e.target as HTMLElement;
  const { left, top } = pageContainer
    ? pageContainer.getBoundingClientRect()
    : { left: 0, top: 0 };

  // TODO: Allow passing in default options list if using default setState action.
  const opts: MenuStateOption[] = [];
  
  const res = {
    pos: { x: e.clientX - left, y: e.clientY - top },
    opts,
    target,
    open: true
  };

  if (get(state).open) {
    state.set({
      ...get(state),
      open: false
    });
    // Prevents menu from opening over itself / visually glitching.
    return setTimeout(() => {
      state.set(res);
    }, 200);
  } else {
    return state.set(res);
  }
};

export {
  key,
  state,
  setState
};
