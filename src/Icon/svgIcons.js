import mindtickleLogo from './assests/images/mindtickleLogo.svg';
import outlookCalendarSvg from './assests/images/outlookCalendar.svg';
import googleCalendar from './assests/images/googleCalendar.svg';
import keywordsFull from './assests/images/keywordsFull.svg';
import keywordsFullActive from './assests/images/keywordsFullActive.svg';
import textConditionFull from './assests/images/textConditionFull.svg';
import textConditionFullActive from './assests/images/textConditionFullActive.svg';
import multipleConditionsFull from './assests/images/multipleConditionsFull.svg';
import multipleConditionsFullActive from './assests/images/multipleConditionsFullActive.svg';
import internalError from './assests/images/internalError.svg';
import pageNotFound from './assests/images/pageNotFound.svg';
import serviceUnavailable from './assests/images/serviceUnavailable.svg';
import noSearchResults from './assests/images/noSearchResults.svg';
import allProgramsDefault from './assests/images/allProgramsDefault.svg';
import allProgramsSelected from './assests/images/allProgramsSelected.svg';
import archiveDefault from './assests/images/archiveDefault.svg';
import archiveSelected from './assests/images/archiveSelected.svg';
import collapsePanel from './assests/images/collapsePanel.svg';
import expandPanel from './assests/images/expandPanel.svg';
import programDefault from './assests/images/programDefault.svg';
import programSelected from './assests/images/programSelected.svg';

export default {
  mindtickleLogo: ({ width = 200, height = 64 }) => ({
    background: `url(${mindtickleLogo})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  outlookCalendar: ({ width = 30, height = 30 }) => ({
    background: `url(${outlookCalendarSvg})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  googleCalendar: ({ width = 30, height = 30 }) => ({
    background: `url(${googleCalendar})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  keywordsFull: ({ width = 30, height = 30 }) => ({
    background: `url(${keywordsFull})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  textConditionFull: ({ width = 30, height = 30 }) => ({
    background: `url(${textConditionFull})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  keywordsFullActive: ({ width = 30, height = 30 }) => ({
    background: `url(${keywordsFullActive})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  textConditionFullActive: ({ width = 30, height = 30 }) => ({
    background: `url(${textConditionFullActive})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  multipleConditionsFull: ({ width = 30, height = 30 }) => ({
    background: `url(${multipleConditionsFull})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  multipleConditionsFullActive: ({ width = 30, height = 30 }) => ({
    background: `url(${multipleConditionsFullActive})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  internalError: ({ width = 268, height = 200, ...style }) => ({
    background: `url(${internalError})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height,
    ...style
  }),
  pageNotFound: ({ width = 200, height = 200 }) => ({
    background: `url(${pageNotFound})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  serviceUnavailable: ({ width = 244, height = 200 }) => ({
    background: `url(${serviceUnavailable})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  noSearchResults: ({ width = 250, height = 216 }) => ({
    background: `url(${noSearchResults})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  allProgramsDefault: ({ width = 16, height = 16 }) => ({
    background: `url(${allProgramsDefault})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  allProgramsSelected: ({ width = 16, height = 16 }) => ({
    background: `url(${allProgramsSelected})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  archiveDefault: ({ width = 16, height = 16 }) => ({
    background: `url(${archiveDefault})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  archiveSelected: ({ width = 16, height = 16 }) => ({
    background: `url(${archiveSelected})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  collapsePanel: ({ width = 20, height = 18 }) => ({
    background: `url(${collapsePanel})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  expandPanel: ({ width = 20, height = 18 }) => ({
    background: `url(${expandPanel})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  programDefault: ({ width = 16, height = 16 }) => ({
    background: `url(${programDefault})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  }),
  programSelected: ({ width = 16, height = 16 }) => ({
    background: `url(${programSelected})  no-repeat 0 0 / contain transparent`,
    width: width,
    height: height
  })
};
