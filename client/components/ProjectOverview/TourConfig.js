'use strict';

const config = {
  '/projects': {
    0: {
      id: 'cardview',
      parent: 'nav-ul',
      description: '"card view" displays the project as index cards'
    },
    1: {
      id: 'fullview',
      parent: 'nav-ul',
      description: '"full view" displays the project in document layout'
      },
    2: {
      id: 'reorder',
      parent: 'nav-ul',
      description: '"reorder" changes the order and parents of index cards.'
    },
    3: {
      id: 'help',
      parent: 'nav-ul',
      description: '"help" displays help bubbles.'
    },
    4: {
      id: 'thumbnail-PROJECT_TYPE-0',
      parent: 'PROJECT_TYPE-container',
      description: 'Double click an index card to display subordinate cards without opening the index card.'
    }
  }, 
  '/projects/reorder': {
    0: {
      id: 'reorder-hot-seat',
      parent: 'hot-seat-reorder-container',
      description: 'Make sure you have opened a project before using reorder.'
    },
    1: {
      id: 'reorder-hot-seat',
      parent: 'hot-seat-reorder-container',
      description: 'Acts, Sequences, Scenes and Beats can be reordered.'
    },
    2: {
      id: 'reorder-hot-seat',
      parent: 'hot-seat-reorder-container',
      description: 'You can also change the parent index card Sequences, Scenes, and Beats belong to.'
    },
    3: {
      id: 'reorder-ACT_TYPE-0',
      parent: 'ACT_TYPE-reorder-container',
      description: 'Drag and drop to rearrange the order of the index cards.'
    },
    4: {
      id: 'reorder-ACT_TYPE-0',
      parent: 'ACT_TYPE-reorder-container',
      description: 'To change parent index card, drag and drop the subordinate card into any card on the tier directly above.'
    },
    5: {
      id: 'reorder-hot-seat',
      parent: 'hot-seat-reorder-container',
      description: 'If the desired parent index card is not visible, drag the child index card here, and navigate to the target parent below.'
    }
  }
};

export default config;
