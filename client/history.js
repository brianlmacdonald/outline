import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history = process.env.NODE_ENV === 'test' ?
createMemoryHistory() :
createHistory({
  getUserConfirmation: function(message, callback){
    return callback(window.confirm(message));
  }
});

export default history;
