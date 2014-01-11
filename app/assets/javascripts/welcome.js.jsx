/** @jsx React.DOM */


var PerfectTodoApp = React.createClass({
  getInitialState: function() {
    return { items: ["test", "hyest"], text: "" };
  },

  createItem: function(e) {
    this.state.items.push(this.state.text);
    this.setState({items: this.state.items});
  },

  changeText: function(e) {
    this.setState({text: e.target.value});
  },

  render: function() {
    return (
      <div>
        <input onChange={this.changeText}/>
        <button onClick={this.createItem}>add</button>
        <ul>
        {
          _.map(this.state.items, function(item) {
            return <li>
              {item}
            </li>
          })
        }
        </ul>
      </div>
    );
  }


});

$(function() {
  React.renderComponent(PerfectTodoApp({}), document.getElementById("todo"));
})
