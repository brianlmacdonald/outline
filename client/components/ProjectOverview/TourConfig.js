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
      id: 'reorder-PROJECT_TYPE-0',
      parent: 'PROJECT_TYPE-reorder-container',
      description: 'Only Acts, Sequences, Scenes and Beats can be reordered.'
    },
    1: {
      id: 'reorder-ACT_TYPE-0',
      parent: 'ACT_TYPE-reorder-container',
      description: 'Drag and drop to rearrange the order of the index cards.'
    },
    2: {
      id: 'reorder-ACT_TYPE-0',
      parent: 'ACT_TYPE-reorder-container',
      description: 'To change parent index card, drag and drop the subordinate card into any card on the tier directly above.'
    }
  }
};

export default config;
