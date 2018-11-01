import React, { Component } from 'react';
// import ChildString from './ChildString';
import ChildTree from './ChildTree';

class ListRenderer extends Component {

  render() {
    return (
      <ul>
        {
          this.props.items.map((item, index) =>
            <ChildTree key={item.id} item={item} renderInput={this.props.renderInput} />
          )
        }
      </ul>
    );

  }
}

export default ListRenderer;
