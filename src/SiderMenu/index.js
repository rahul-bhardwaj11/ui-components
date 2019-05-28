import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Scrollbar from '../Scrollbar';

import SiderWrapper from './Wrapper';
import SiderStyle from './style';

const itemShape = PropTypes.shape({
  type: PropTypes.oneOf(['Group', 'SubMenu', 'Item']).isRequired,
  scroll: PropTypes.bool,
  chilren: itemShape
});

class SiderMenu extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemShape),
    propsToPass: PropTypes.shape({
      scrollbar: PropTypes.object,
      sider: PropTypes.object,
      menu: PropTypes.object
    }),
    sectionScroll: PropTypes.bool,
    width: PropTypes.number,
    preMenuContent: PropTypes.element,
    postMenuContent: PropTypes.element
  };
  static defaultProps = {
    width: 280,
    selected: [],
    scrollOffset: '0px',
    propsToPass: {}
  };

  state = {
    scrollableHeight: undefined
  };

  beforeScrollableMenuRef = React.createRef();
  afterScrollableMenuRef = React.createRef();
  noSectionScrollRef = React.createRef();

  componentDidMount() {
    if (this.props.sectionScroll) {
      const beforeEl = this.beforeScrollableMenuRef.current;
      const afterEl = this.afterScrollableMenuRef.current;
      const { height: bHeight, top: bTop } = beforeEl.getBoundingClientRect();
      const { height: aHeight } = afterEl.getBoundingClientRect();

      this.setState({
        scrollableHeight: `calc(100vh - ${bHeight + bTop}px - ${aHeight}px)`
      });
      return;
    }

    const noSectionScrollEl = this.noSectionScrollRef.current;
    const { top } = noSectionScrollEl.getBoundingClientRect();
    this.setState({
      scrollableHeight: `calc(100vh - ${top}px)`
    });
  }

  render() {
    const {
      items,
      sectionScroll,
      propsToPass: { scrollbar = {}, sider = {}, menu = {} },
      preMenuContent,
      postMenuContent,
      ...rest
    } = this.props;
    const { scrollableHeight } = this.state;

    const commonProps = {
      siderPropsToPass: sider,
      menuPropsToPass: menu,
      ...rest
    };

    let itemsBeforeScrollableItem = items;
    let scrollableItem = [];
    let itemsAfterScrollableItem = [];
    if (sectionScroll) {
      const index = items.findIndex(({ scroll }) => scroll);
      if (index !== -1) {
        itemsBeforeScrollableItem = items.slice(0, index);
        scrollableItem = items.slice(index, index + 1);
        itemsAfterScrollableItem = items.slice(index + 1);
      }
    }

    return (
      <SiderStyle>
        {sectionScroll && (
          <React.Fragment>
            <div ref={this.beforeScrollableMenuRef}>
              <SiderWrapper
                items={itemsBeforeScrollableItem}
                {...commonProps}
                preMenuContent={preMenuContent}
              />
            </div>
            <Scrollbar
              autoHeight
              autoHeightMax={scrollableHeight}
              style={{ width: rest.width }}
              {...scrollbar}
            >
              <SiderWrapper
                className="userDefinedItems"
                items={scrollableItem}
                height={scrollableHeight}
                {...commonProps}
              />
            </Scrollbar>
            <div ref={this.afterScrollableMenuRef}>
              {!!itemsAfterScrollableItem.length && (
                <SiderWrapper
                  items={itemsAfterScrollableItem}
                  {...commonProps}
                  postMenuContent={postMenuContent}
                />
              )}
            </div>
          </React.Fragment>
        )}

        {!sectionScroll && (
          <div ref={this.noSectionScrollRef}>
            <Scrollbar
              style={{ height: scrollableHeight, width: rest.width }}
              {...scrollbar}
            >
              <SiderWrapper
                items={items}
                preMenuContent={preMenuContent}
                postMenuContent={postMenuContent}
                {...commonProps}
              />
            </Scrollbar>
          </div>
        )}
      </SiderStyle>
    );
  }
}

export default SiderMenu;
