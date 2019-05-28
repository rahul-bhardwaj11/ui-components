import { MEDIA_STATES } from '../config/constants';
import {
  commentBoxHelperRenderer,
  commentBoxRenderer
} from '../utils/defaultRenderers';
import { splitByExistingKeys } from '.';

const localState = {
  commentHelperBox: {
    show: false,
    data: {}
  },
  commentBox: {
    show: false,
    data: {
      text: ''
    }
  },
  media: {
    currentTime: 0,
    state: MEDIA_STATES.PLAY
  }
};

const initialState = {
  showControlsOnly: false,
  edit: true,
  autoplay: false,
  startTime: 0,
  comments: [],
  commentBarClassName: '',
  videoControlsClassName: '',
  videoControlsButtonsClassName: '',
  videoSeekBarClassName: '',
  disableComments: false,
  commentBoxHelperRenderer,
  commentBoxRenderer
};
const localStateKeys = Object.keys(localState);
const initialPropsKeys = Object.keys(initialState);

const getInitialState = props => {
  const mergedState = {
    ...initialState,
    ...splitByExistingKeys([...initialPropsKeys], props).included,
    ...localState
  };
  if (!mergedState.autoplay) {
    mergedState.media.state = MEDIA_STATES.PAUSE;
  }
  mergedState.media.currentTime = mergedState.startTime;
  return mergedState;
};

const excludedKeys = [...localStateKeys, ...initialPropsKeys].filter(
  v => v !== 'comments'
);

export function getDerivedState(currentState, nextProps) {
  return {
    ...currentState,
    ...splitByExistingKeys(excludedKeys, nextProps).excluded
  };
}

export default getInitialState;
