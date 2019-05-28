export let actions = () => ({
  showCommentHelperBox: (state, payload) => {
    const ret = {};
    Object.keys(payload)
      .filter(key => payload[key] !== undefined)
      .forEach(key => (ret[key] = payload[key]));

    return {
      ...state,
      commentHelperBox: {
        show: true,
        data: {
          ...state.commentBox.data,
          ...ret
        }
      }
    };
  },
  hideCommentHelperBox: state => {
    return {
      ...state,
      commentHelperBox: {
        show: false,
        data: {}
      }
    };
  },
  showCommentBox: (state, payload) => {
    const ret = {};
    Object.keys(payload)
      .filter(key => payload[key] !== undefined)
      .forEach(key => (ret[key] = payload[key]));

    return {
      ...state,
      commentBox: {
        show: true,
        data: {
          ...state.commentBox.data,
          ...ret
        }
      }
    };
  },
  hideCommentBox: state => {
    return {
      ...state,
      commentBox: {
        show: false,
        data: {}
      }
    };
  },
  updateMediaAttributes: (state, mediaPayload) => {
    const ret = {};
    Object.keys(mediaPayload)
      .filter(key => mediaPayload[key] !== undefined)
      .forEach(key => (ret[key] = mediaPayload[key]));
    return {
      ...state,
      media: {
        ...state.media,
        ...ret
      }
    };
  },
  hideCommentBoxError: state => {
    return {
      ...state,
      commentBox: {
        ...state.commentBox,
        error: false
      }
    };
  }
});
