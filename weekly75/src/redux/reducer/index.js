import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 主题
import theme from './theme';
// 阅读
import readability from './readability';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  readability: readability,
});
