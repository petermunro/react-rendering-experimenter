import React, { Component } from 'react';
import './MutationWatcher.css';

// Console CSS colors
const DELETED = 'color: red; text-decoration: line-through';
const ADDED   = 'color: green';
const LABEL   = 'color: #426bb6';
const RESET   = 'all:inherit';

function logMutation(mutation) {
  switch (mutation.type) {
    case 'characterData':
      console.log(`[DOM] Changed %ccharacter data%c from %c${mutation.oldValue}%c to %c${mutation.target.data}`, LABEL, RESET, DELETED, RESET, ADDED);
      break;
    case 'childList':
      let added = mutation.addedNodes.length;
      let removed = mutation.removedNodes.length;
      console.group(`[DOM] Modified child list (+${mutation.addedNodes.length}/-${mutation.removedNodes.length}):`);
      if (added) {
        console.log(` Added: ${Array.from(mutation.addedNodes).map(added => added.innerText || added.placeholder)}`);
      }
      if (removed) {
        console.log(` Removed: ${Array.from(mutation.removedNodes).map(removed => removed.innerText || removed.placeholder)}`);
      }
      console.groupEnd();
      break;
    case 'attributes':
      console.log(`[DOM] Changed %c${mutation.attributeName}%c attribute from %c${mutation.oldValue}%c to %c${mutation.target.placeholder}`, LABEL, RESET, DELETED, RESET, ADDED);
      break;
    default:
      console.log(`[DOM Unknown mutation type: ${mutation.type}`);
      break;
  }
}

function mutationCallback(mutationsList, observer) {
  for (let mutation of mutationsList) {
    logMutation(mutation);
  }
}

const config = {
  attributes: true,
  attributeOldValue: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true,
};


class MutationWatcher extends Component {
  constructor(props) {
    super(props);
    this.mutationObserver = new MutationObserver(mutationCallback);
  }

  render() {
    let targetNode = this.props.observe.current;
    if (targetNode !== null) {
      this.mutationObserver.observe(targetNode, config);
    }

    return (
      <div className="mutation-watcher">
        MutationWatcher: {' '}
        {
          targetNode
          ? <em>watching &lt;{targetNode.tagName}&gt;</em>
          : <em>waiting to watch… (open console to view VDOM and DOM mutations)</em>
        }
      </div>
    )
  }

  componentWillUnmount() {
    this.mutationObserver.disconnect();
  }
}

export default MutationWatcher;
