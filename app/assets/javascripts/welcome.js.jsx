/** @jsx React.DOM */

var Test = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

React.renderComponent(<Test name="test" />, document.getElementById("test"));
