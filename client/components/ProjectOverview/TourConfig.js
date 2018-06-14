'use strict';

const config = {
  '/projects': {
    0: {
      id: 'cardview',
      parent: 'nav-ul',
      description: 'views index cards'
    },
    1: {
      id: 'fullview',
      parent: 'nav-ul',
      description: 'shows full project'
      },
    2: {
      id: 'reorder',
      parent: 'nav-ul',
      description: 'reorders index cards'
    },
    3: {
      id: 'help',
      parent: 'nav-ul',
      description: 'displays help bubbles'
    },
    4: {
      id: 'add-PROJECT_TYPE',
      parent: 'PROJECT_TYPE-container',
      description: 'click to create new project'
    },
    5: {
      id: 'thumbnail-PROJECT_TYPE-0',
      parent: 'PROJECT_TYPE-container',
      description: 'double click card to open child index cards'
    }
  }
};

export default config;
