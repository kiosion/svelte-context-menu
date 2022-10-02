<script lang="ts">
  import { setContext, createEventDispatcher } from 'svelte';
  import { key } from './menu';
  import { setState } from './menu';

  export let x: number;
  export let y: number;
  export let page: HTMLElement = document.body;
  export let wrapperClasses: string = '';
  export let setStateAction = setState;

  let menuElement: HTMLElement;

  const dispatch = createEventDispatcher();

  $: (() => {
    if (!menuElement) {
      return;
    }

    const rect = menuElement.getBoundingClientRect();
    const pageRect = page.getBoundingClientRect();

    x = Math.min(window.innerWidth - rect.width - 18, x);
    if (
      y >
      Math.min(window.innerHeight, pageRect.height + pageRect.top) - rect.height
    ) {
      y -= rect.height;
    }
  })();

  setContext(key, {
    dispatchClick: () => dispatch('click')
  });

  const pageClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | undefined;
    if (target === menuElement || menuElement.contains(target)) {
      return;
    }
    dispatch('clickoutside');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.code)) {
      return setStateAction();
    }
  };
</script>

<svelte:body 
  on:click={pageClick}
  on:mouseleave={() => setStateAction()}
  on:mousewheel={() => setStateAction()}
  on:wheel={() => setStateAction()}
  on:keydown={handleKeyDown}
/>

<div
  class="context-menu {wrapperClasses}"
  style="top: {y}px; left: {x}px"
  bind:this={menuElement}
>
  <slot />
</div>
