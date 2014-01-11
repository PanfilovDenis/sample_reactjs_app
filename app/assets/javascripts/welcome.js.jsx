/** @jsx React.DOM */
var Item = React.createClass({
  render: function() {
    switch(this.props.item.state) {
      case "uncomplited":
        return (
          <li>
            <span onClick={this.props.editItem} className="text">{this.props.item.id}: {this.props.item.text}</span>
            <button onClick={this.props.removeItem} value={this.props.item.id}>Remove</button>
          </li>
        );
      case "editable":
        return (
          <li>
            <input onChange={this.props.updateDraft} value={this.props.item.draftText} />
            <button onClick={this.props.saveItem} value={this.props.item.id}>Save</button>
          </li>
        );
    }

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

  editItem: function(item) {
    var key = _.findKey(this.state.items, item);
    item.state = "editable";
    this.state.items[key] = item;

    var newState = {
      items: this.state.items
    }

    this.setState(newState);
  },

  updateDraft: function(item, e) {
    var key = _.findKey(this.state.items, item);
    item.draftText = e.target.value;

    this.state.items[key] = item;

    var newState = {
      items: this.state.items
    }

    this.setState(newState);
  },

  saveItem: function(item) {
    var key = _.findKey(this.state.items, item);
    item.text = item.draftText;
    item.state = "uncomplited";

    this.state.items[key] = item;

    var newState = {
      items: this.state.items
    }

    this.setState(newState);
  },

  createItem: function() {
    this.state.items.push({
      id: this.state.nextId,
      text: this.state.text,
      state: "uncomplited",
      draftText: this.state.text
    })

    var newState = {
      items: this.state.items,
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
             return(<Item
                      item={item}
                      removeItem={this.removeItem.bind(this, item)}
                      editItem={this.editItem.bind(this, item)}
                      updateDraft={this.updateDraft.bind(this, item)}
                      saveItem={this.saveItem.bind(this, item)}/>)


          }, this)
        }</ul>
      </div>
    );
  }


});

$(function() {
  React.renderComponent(PerfectTodoApp({}), document.getElementById("todo"));
})
