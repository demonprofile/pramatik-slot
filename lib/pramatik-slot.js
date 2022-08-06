'use babel';

import PramatikSlotView from './pramatik-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  pramatikSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pramatikSlotView = new PramatikSlotView(state.pramatikSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pramatikSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pramatik-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pramatikSlotView.destroy();
  },

  serialize() {
    return {
      pramatikSlotViewState: this.pramatikSlotView.serialize()
    };
  },

  toggle() {
    console.log('PramatikSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
