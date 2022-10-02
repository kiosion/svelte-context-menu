declare module './context-menu.svelte';

export interface MenuState {
  open: boolean;
  pos: {
    x: number;
    y: number;
  };
  target: HTMLElement;
  opts: MenuStateOption[] | any; // TODO: Type this better, svelte component instead of unknown
}

export interface MenuStateOption {
  disabled?: boolean;
  text?: string;
  action?: () => void | Promise<void> | undefined;
}
