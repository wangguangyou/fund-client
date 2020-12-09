<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style >
  .not-margin {
    margin: 0;
    font-weight: 400;
    padding: 10px 10px 0;
  }
  html,
  body,
  #app {
    height: 100%;
  }
  :root {
    --vs-background2: 198, 213, 255;
  }
  .vs-select__options:after {
    display: none;
  }
  .vs-tooltip__loading:before {
    border: 2px dashed rgba(var(--vs-background2), 1) !important;
    border-top: 2px solid rgba(var(--vs-background2), 0) !important;
    border-left: 2px solid rgba(var(--vs-background2), 0) !important;
    border-bottom: 2px solid rgba(var(--vs-background2), 0) !important;
  }
  .vs-tooltip__loading:after {
    border: 2px solid rgba(var(--vs-background2), 1) !important;
    border-top: 2px solid rgba(var(--vs-background2), 0) !important;
    border-left: 2px solid rgba(var(--vs-background2), 0) !important;
    border-bottom: 2px solid rgba(var(--vs-background2), 0) !important;
  }
  .vs-select__option.activeOption {
    pointer-events: auto !important;
  }
  .nomatch {
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: #4a4a4a;
    display: inline-flex;
    font-size: 0.75rem;
    min-height: 2em;
    justify-content: center;
    line-height: 1.5;
    padding-left: 0.75em;
    padding-right: 0.75em;
    background-color: #feecf0;
    color: #cc0f35;
  }
  .match {
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: #4a4a4a;
    display: inline-flex;
    font-size: 0.75rem;
    min-height: 2em;
    justify-content: center;
    line-height: 1.5;
    padding-left: 0.75em;
    padding-right: 0.75em;

    background-color: #ebfffc;
    color: #00947e;
  }

  .vs-table__tbody::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: block;
    background: transparent;
  }
  .vs-table__tbody::-webkit-scrollbar-thumb {
    background: rgba(var(--vs-gray-3), 1);
    border-radius: 5px;
  }

  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display: block;
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background: rgba(var(--vs-gray-3), 1);
    border-radius: 5px;
  }
</style>
