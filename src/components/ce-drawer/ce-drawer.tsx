import { Component, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'ce-drawer',
  styleUrl: 'ce-drawer.css',
  shadow: true,
})
export class CeDrawer {
  @Prop({
    attribute: 'show',
    mutable: true,
    reflect: true,
  })
  visible: Boolean = false;

  @Prop()
  width: string = '36%';

  @Prop({
    attribute: 'show-header',
    mutable: true,
    reflect: true,
  })
  showHeader: boolean = false;

  @Prop({
    attribute: 'header',
  })
  header: string = '';

  @Prop({
    attribute: 'mask-closable',
    mutable: true,
    reflect: true,
  })
  maskClosable: boolean = true;

  @Prop({
    attribute: 'placement',
    mutable: true,
    reflect: true,
  })
  placement: string = 'right';

  /**监听传入的 placement 是否符合要求*/
  @Watch('placement')
  validateName(val: string) {
    const flag = ['left', 'right', 'top', 'bottom'].includes(val);
    if (!flag) {
      throw new Error('placement 必须是 left/right/top/bottom 其中之一');
    }
  }

  renderHeader() {
    if (this.showHeader) {
      return (
        <div class="ivy-drawer-header">
          <slot name="header">{this.header}</slot>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Host show={this.visible}>
        <div class="ivy-mask" onClick={this.maskClose.bind(this)}></div>
        <div
          class="ivy-drawer"
          style={{ width: ['left', 'right'].includes(this.placement) ? this.width : '100%', height: ['top', 'bottom'].includes(this.placement) ? this.width : '100%' }}
        >
          {this.renderHeader()}

          <div class="ivy-drawer-body">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }

  @Event() closed: EventEmitter;
  closeHandler() {
    this.closed.emit();
  }

  @Method()
  async open() {
    this.visible = true;
  }
  @Method()
  async close() {
    this.closeHandler();
    this.visible = false;
  }

  maskClose() {
    if (this.maskClosable) {
      this.visible = false;
    }
  }
}
