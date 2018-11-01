import React, { Component } from 'react';

class ChildString extends Component {
  constructor(props) {
    super(props);
    this.listItem = React.createRef();
  }

  render() {
    let domNode = this.listItem.current ? this.listItem.current.innerText : '(undefined)';
    console.log(`[VDOM] ChildString render(): current DOM node:`, domNode, ` new object: ${this.props.item.id} new fruit: ${this.props.item.fruit}`, this.props.item);
    return (<li ref={this.listItem}>
      {this.props.item.fruit}
    </li>);
  }

  componentDidMount() {
    console.log(`[VDOM] ChildString rendered ${this.props.item.id} ${this.props.item.fruit}`, this.listItem);
  }
  
  componentDidUpdate() {
    console.log(`[VDOM] ChildString updated ${this.props.item.id} ${this.props.item.fruit}`, this.listItem);
  }
}

export default ChildString;
