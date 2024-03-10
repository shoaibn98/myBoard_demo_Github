
class Note extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        task: [this.props.children],
        editing: false,
        pro: false,
      };
      this.random = this.random.bind(this);
      this.delete = this.delete.bind(this);
      this.save = this.save.bind(this);
      this.edit = this.edit.bind(this);
      this.checkPro = this.checkPro.bind(this);
      this.pro = this.pro.bind(this);
      this.setPro = this.setPro.bind(this);
      this.cancel = this.cancel.bind(this);
      this.renderPro = this.renderPro.bind(this);
      this.renderEdit = this.renderEdit.bind(this);
      this.renderDiv = this.renderDiv.bind(this);
    }
  
    componentWillMount() {
      this.style = {
        left: this.random(0, window.innerWidth - 250) + "px",
        top: this.random(0, window.innerHeight - 150) + "px",
        transform: "rotate(" + this.random(-15, 25) + "deg)",
      };
    }
    componentDidMount() {
      $(ReactDOM.findDOMNode(this)).draggable();
    }
    random(min, max) {
      return min + Math.floor(Math.random() * max);
    }
    delete() {
      var id = this.props.children.id;
      this.props.onRefresh("doDeleteTask","",id,"")
    }
    save() {
      var newText = ReactDOM.findDOMNode(this.refs.newText).value;
      var id = this.props.children.id;
      this.props.onRefresh("doChangeText","",id,newText)
      this.setState({ editing: false });
    }
    edit() {
      this.setState({ editing: true });
    }
    checkPro() {
      var y;
      if (this.props.children.pro == 0) {
        y = "task-note task-note-0";
      } else if (this.props.children.pro == 1) {
        y = "task-note task-note-1";
      } else if (this.props.children.pro == 2) {
        y = "task-note task-note-2";
      } else if (this.props.children.pro == 3) {
        y = "task-note task-note-3";
      }
      return y;
    }
    
    pro() {
      this.setState({ pro: true });
    }
    setPro(x) {
      var pro=$(x.target).text()
       var id = this.props.children.id;
      this.props.onRefresh("doChangePro","",id,pro)
      this.setState({pro:false})
    }
    cancel() {
      this.setState({ editing: false });
    }
    renderPro() {
      return (
        <div className={this.checkPro()} style={this.style}>
          <span>
            <i className="fas fa-bowling-ball"></i>
          </span>
          <h6>{this.props.children.task}</h6>
          <div className="btn-div ">
            <h6 className="text-center">Set Property</h6>
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm btn-0 mx-1" onClick={this.setPro}>
                0
              </button>
              <button className="btn btn-sm btn-1 mx-1" onClick={this.setPro}>
                1
              </button>
              <button className="btn btn-sm btn-2 mx-1" onClick={this.setPro}>
                2
              </button>
              <button className="btn btn-sm btn-3 mx-1" onClick={this.setPro}>
                3
              </button>
            </div>
          </div>
        </div>
      );
    }
    renderEdit() {
      return (
        <div className={this.checkPro()} style={this.style}>
          <span>
            <i className="fas fa-bowling-ball"></i>
          </span>
          <textarea ref="newText" cols="15" rows="5">
            {this.props.children.task}
          </textarea>
          <div className="btn-div ">
            <button className="btn btn-sm btn-danger mx-1" onClick={this.cancel}>
              <i className="fas fa-times  "></i>
            </button>
            <button className="btn btn-sm btn-warning mx-1" onClick={this.pro}>
              <i className="fas fa-layer-group"></i>
            </button>
            <button className="btn btn-sm btn-success mx-1" onClick={this.save}>
              <i className="fas fa-check "></i>
            </button>
          </div>
        </div>
      );
    }
    renderDiv() {
      return (
        <div className={this.checkPro()} style={this.style}>
          <span>
            <i className="fas fa-bowling-ball"></i>
          </span>
  
          <h6>{this.props.children.task}</h6>
          <div className="btn-div ">
            <button className="btn btn-danger mx-1" onClick={this.delete}>
              <i className="fas fa-trash-alt"></i>
            </button>
            <button className="btn btn-primary mx-1" onClick={this.edit}>
              <i className="fas fa-edit "></i>
            </button>
          </div>
        </div>
      );
    }
    render() {
      if (this.state.editing) {
        if (this.state.pro) {
          return this.renderPro();
        } else {
          return this.renderEdit();
        }
      } else {
        return this.renderDiv();
      }
    }
  }
  