
class ListDiv extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        allBtn: [],
      };
      this.changeStatus = this.changeStatus.bind(this);
      this.printListName = this.printListName.bind(this);
      this.openList = this.openList.bind(this);
    }
  
    changeStatus(txt) {
      this.props.onChange(txt);
    }
   
    printListName(list) {
      
      return (
        <RenderBtn
          listStatus={this.props.listStatus}
          onChange={this.changeStatus}
        >
          {list}
        </RenderBtn>
      );
    }
    openList(x) {
      var a = x.target;
      $(a).next().toggle("1000");
    }
    render() {
      return (
        <div className=" first-div p-2 ">
          <button className="btn btn-block btn-warning" onClick={this.openList}>
            Show List
          </button>
          <div className="h-100 ">
            {this.props.listsName.map(this.printListName)}
            <button onClick={()=>{this.props.onNewList()}} className="btn btn-light btn-block">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      );
    }
  }