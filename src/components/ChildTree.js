import React, { Component } from 'react';

class ChildTree extends Component {
  constructor(props) {
    super(props);
    this.listItem = React.createRef();
  }

  render() {
    let domNode = this.listItem.current ? this.listItem.current.innerText : '(undefined)';
    console.log(`[VDOM] ChildTree render: current DOM node:`, domNode, ` new obj: ${this.props.item.id} new fruit: ${this.props.item.fruit}`, this.props.item);
    return (
      <li ref={this.listItem}>
        <p>Here is a fruit: <em>{this.props.item.fruit}</em></p>
        {this.props.renderInput && <input placeholder={`Type "${this.props.item.fruit}" here`} />}
      </li>
    );
  }

  componentDidMount() {
    console.log(`[VDOM] ChildTree rendered ${this.props.item.id} ${this.props.item.fruit}`, this.listItem);
  }

  componentDidUpdate() {
    console.log(`[VDOM] ChildTree updated ${this.props.item.id} ${this.props.item.fruit}`, this.listItem);
  }
}

export default ChildTree;
