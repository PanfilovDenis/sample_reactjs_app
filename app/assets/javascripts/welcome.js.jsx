/** @jsx React.DOM */
var Item = React.createClass({
  render: function() {
    return (
      <li>
        <span className="text">{this.props.value}</span>
        <button onClick={this.props.removeItem} value={this.props.id}>Remove</button>
      </li>
    );
  }
});

var PerfectTodoApp = React.createClass({
  getInitialState: function() {
    return { items: [], text: "", nextId: 0};
  },

  removeItem: function(item) {
    var newState = {
      items: _.without(this.state.items, item)
    }

    this.setState(newState);
  },

  createItem: function(e) {
    var newState = {
      items: this.state.items.push({id: this.state.nextId, text: this.state.text}),
      nextId: this.state.nextId + 1,
      text: ""
    }

    this.setState(newState);
  },

  changeText: function(e) {
    var newState = {
      text: e.target.value
    };
    this.setState(newState);
  },

  render: function() {
    return (
      <div>
        <input onChange={this.changeText} value={this.state.text} />
        <button onClick={this.createItem}>add</button>
        <ul>{
          _.map(this.state.items, function(item) {
             return(<Item id={item.id} value={item.text} removeItem={this.removeItem.bind(this, item)} />)
          }, this)
        }</ul>
      </div>
    );
  }


});

$(function() {
  React.renderComponent(PerfectTodoApp({}), document.getElementById("todo"));
})
