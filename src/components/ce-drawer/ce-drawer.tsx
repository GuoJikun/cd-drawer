import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ce-drawer',
  styleUrl: 'ce-drawer.css',
  shadow: true,
})
export class CeDrawer {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
