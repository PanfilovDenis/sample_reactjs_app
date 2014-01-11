/** @jsx React.DOM */


var PerfectTodoApp = React.createClass({
  getInitialState: function() {
    return { items: ["test", "hyest"] };
  },

  render: function() {
    console.log(this.state.items);
    return (
      <ul>
      {
        _.map(this.state.items, function(item) {
          return <li>
            {item}
          </li>
        })
      }
      </ul>);
  }


});

$(function() {
  React.renderComponent(PerfectTodoApp({}), document.getElementById("todo"));
})
