class RenderBtn extends React.Component {
    constructor(props) {
      super(props);
      this.option = this.option.bind(this);
      this.setCurrent = this.setCurrent.bind(this);
    }
    componentWillMount() {
      this.style = {
        background: "#fff",
      };
    }
    option() {
      this.props.onChange(this.props.children.id);
    }
    setCurrent() {
      var a = "#fff";
      if (this.props.children.id == this.props.listStatus) {
        a = "#9fefcc";
      }
      this.style = {
        background: a,
      };
    }
  
    render() {
      this.setCurrent();
      return (
        <button
          className="btn btn-block mt-1"
          style={this.style}
          onClick={this.option}
        >
          {this.props.children.name}
        </button>
      );
    }
  }