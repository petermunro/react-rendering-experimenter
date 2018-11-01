import React, { Component } from 'react';
import ListRenderer from './ListRenderer';
import MutationWatcher from './MutationWatcher';


// Return a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

let fruit = ["Açaí", "Apple", "Akee", "Apricot", "Avocado", "Banana", "Bilberry", "Blackberry", "Blackcurrant", "Black sapote", "Blueberry", "Boysenberry", "Buddha's hand", "Crab apples", "Currant", "Cherry", "Cherimoya", "Chico fruit", "Cloudberry", "Coconut", "Cranberry", "Cucumber", "Damson", "Date", "Dragonfruit", "Pitaya", "Durian", "Elderberry", "Feijoa", "Fig", "Goji berry", "Gooseberry", "Grape", "Raisin", "Grapefruit", "Guava", "Honeyberry", "Huckleberry", "Jabuticaba", "Jackfruit", "Jambul", "Japanese plum", "Jostaberry", "Jujube", "Juniper berry", "Kiwano", "Kiwifruit", "Kumquat", "Lemon", "Lime", "Loquat", "Longan", "Lychee", "Mango", "Mangosteen", "Marionberry", "Melon", "Cantaloupe", "Honeydew", "Watermelon", "Miracle fruit", "Mulberry", "Nectarine", "Nance", "Olive", "Orange", "Blood orange", "Clementine", "Mandarine", "Tangerine", "Papaya", "Passionfruit", "Peach", "Pear", "Persimmon", "Plantain", "Plum", "Prune", "Pineapple", "Pineberry", "Plumcot", "Pomegranate", "Pomelo", "Purple mangosteen", "Quince", "Raspberry", "Salmonberry", "Rambutan", "Redcurrant", "Salal", "Salak", "Satsuma", "Soursop", "Star apple", "Star fruit", "Strawberry", "Surinam cherry", "Tamarillo", "Tamarind", "Ugli fruit", "White currant", "White sapote", "Yuzu"];

function getRandomFruit() {
  return fruit[getRandomInt(0, fruit.length)];
}

function insertMid(arr, elem) {
  let midpoint = Math.floor(arr.length / 2);
  return [...arr.slice(0, midpoint), elem, ...arr.slice(midpoint)];
}

const TOP = 0;
const MIDDLE = 1;
const BOTTOM = 2;

class ListOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          fruit: 'apple',
          id: 173
        },
        {
          fruit: 'pear',
          id: 754
        },
        {
          fruit: 'banana',
          id: 234
        }
      ],
      renderInput: false,
    }

    this.observedComponent = React.createRef();

    this.addFruit = this.addFruit.bind(this);
    this.changeText = this.changeText.bind(this);
    this.toggleRenderInput = this.toggleRenderInput.bind(this);
    this.dummySort = this.dummySort.bind(this);
  }

  render() {
    return (
      <>
        <button onClick={() => this.addFruit(TOP)}>Add at Top</button>
        <button onClick={() => this.addFruit(MIDDLE)}>Add in Middle</button>
        <button onClick={() => this.addFruit(BOTTOM)}>Add at Bottom</button>
        <button onClick={this.changeText} value={this.state.renderInput}>Change an Item's Text</button>
        <button onClick={this.dummySort}>Sort</button>
        <label>
          <input type="checkbox" onClick={this.toggleRenderInput} />
          Render Input Box
        </label>
        <div ref={this.observedComponent}>
          <ListRenderer items={this.state.items} renderInput={this.state.renderInput} />
        </div>

        <MutationWatcher observe={this.observedComponent} />
      </>
    )
  };

  dummySort() {
    this.setState({
      items: [
        {
          fruit: 'banana',
          id: 234
        },
        {
          fruit: 'pear',
          id: 754
        },
        {
          fruit: 'apple',
          id: 173
        },
      ]
    });
  }

  addFruit(location) {
    // id isn't unique, but should be ok for a small demo...
    let newFruit = { fruit: getRandomFruit(), id: getRandomInt(100, 1000) };

    if (location === TOP) {
      this.setState({ items: [newFruit, ...this.state.items,] });
    } else if (location === BOTTOM) {
      this.setState({ items: [...this.state.items, newFruit,] });
    } else {
      this.setState({ items: insertMid(this.state.items, newFruit) });
    }
  }

  changeText() {
    let randomFruitItemIndex = getRandomInt(0, this.state.items.length);
    let updatedFruitList = this.state.items.map((fruitItem, index) =>
      index === randomFruitItemIndex ? ({ id: fruitItem.id, fruit: getRandomFruit() }) : fruitItem
    );
    this.setState({ items: updatedFruitList });
  }

  toggleRenderInput() {
    this.setState(currState => ({ renderInput: !currState.renderInput }));
  }
}

export default ListOwner;
