<script lang="ts">
  import { state, setState } from './menu';
  import Menu from './menu.svelte';
  import Option from './option.svelte';
  import Divider from './divider.svelte';

  export let page: HTMLElement;
  export let setStateAction = setState;

  export let menuWrapperComponent: typeof Menu = Menu;
  export let optionComponent: typeof Option = Option;
  export let dividerComponent: typeof Divider = Divider;
</script>

<svelte:component
  this={menuWrapperComponent}
  {...$state.pos}
  {page}
  on:click={() => setStateAction()}
  on:clickoutside={() => setStateAction()}
>
  {#if $state.open}
    {#each $state.opts as option, index}
      {#if option.text}
        <svelte:component
          this={optionComponent}
          text={option.text}
          disabled={option.disabled}
          {index}
          on:click={option.action ? option.action : () => undefined}
        />
      {:else}
        <svelte:component this={dividerComponent} />
      {/if}
    {/each}
  {/if}
</svelte:component>
