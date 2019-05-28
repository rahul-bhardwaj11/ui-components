import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { createStore } from './storeHelper';
import getInitialState, { getDerivedState } from './stateHelper';
import { IS_DEV } from '.';

const { Provider, Consumer } = createContext();

export default function ProviderHelperHoc(Comp) {
  class ProviderHelper extends Component {
    constructor(props) {
      super(props);
      this.store = createStore(getInitialState(props));
      if (IS_DEV) {
        window.raPlayer = this.store;
      }
    }

    static propTypes = {
      forwardedRef: PropTypes.object
    };

    componentWillReceiveProps(nextProps) {
      const currentState = this.store.getState();
      const newState = getDerivedState(currentState, nextProps);
      this.store.setState(newState);
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      return (
        <Provider value={this.store}>
          <Comp ref={forwardedRef} {...props} />
        </Provider>
      );
    }
  }
  return React.forwardRef((props, ref) => (
    <ProviderHelper forwardedRef={ref} {...props} />
  ));
}

const noop = state => state;

export function connect(mapStateToProps = noop, actions) {
  return function connectedWrapper(Comp) {
    class Connected extends Component {
      static displayName = `Connected(${Comp.displayName || Comp.name})`;
      static propTypes = {
        forwardedRef: PropTypes.object
      };
      constructor() {
        super();
        this.stateChanged = this.stateChanged.bind(this);
      }

      stateChanged = () => {
        this.setState({});
      };

      createBoundActions = () => {
        const reducers = actions();
        let boundActions = {};
        Object.keys(actions()).reduce((boundActions, v) => {
          boundActions[v] = payload => {
            const newState = reducers[v](this.store.getState(), payload);
            this.store.setState(newState);
          };
          return boundActions;
        }, boundActions);
        this.boundActions = boundActions;
      };

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { forwardedRef, ...ownProps } = this.props;
        return (
          <Consumer>
            {store => {
              const stateProps = mapStateToProps(store.getState());
              this.store = store;
              this.unsubscribe = store.subscribe(this.stateChanged);
              if (!this.boundActions) {
                this.createBoundActions();
              }
              // TODO: have to fix this through memorization
              let mergedProps = Object.assign(
                {},
                ownProps,
                stateProps,
                this.boundActions
              );
              return <Comp ref={forwardedRef} {...mergedProps} />;
            }}
          </Consumer>
        );
      }
    }
    return React.forwardRef((props, ref) => (
      <Connected forwardedRef={ref} {...props} />
    ));
  };
}
