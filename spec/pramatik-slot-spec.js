'use babel';

import PramatikSlot from '../lib/pramatik-slot';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PramatikSlot', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pramatik-slot');
  });

  describe('when the pramatik-slot:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.pramatik-slot')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pramatik-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.pramatik-slot')).toExist();

        let pramatikSlotElement = workspaceElement.querySelector('.pramatik-slot');
        expect(pramatikSlotElement).toExist();

        let pramatikSlotPanel = atom.workspace.panelForItem(pramatikSlotElement);
        expect(pramatikSlotPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'pramatik-slot:toggle');
        expect(pramatikSlotPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.pramatik-slot')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pramatik-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let pramatikSlotElement = workspaceElement.querySelector('.pramatik-slot');
        expect(pramatikSlotElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'pramatik-slot:toggle');
        expect(pramatikSlotElement).not.toBeVisible();
      });
    });
  });
});
