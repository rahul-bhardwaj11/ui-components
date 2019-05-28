import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import PropTypes from 'prop-types';
import 'react-sortable-tree/style.css';
import TreeNode from './TreeNode';

class Tree extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    treeData: PropTypes.array,
    onChange: PropTypes.func,
    onMoveNode: PropTypes.func,
    canDrag: PropTypes.func,
    canDrop: PropTypes.func,
    treeNodeRenderer: PropTypes.func
  };

  render() {
    return (
      <SortableTree
        {...this.props}
        maxDepth={2}
        scaffoldBlockPxWidth={10}
        isVirtualized={false}
      />
    );
  }
}
Tree.TreeNode = TreeNode;
export default Tree;
