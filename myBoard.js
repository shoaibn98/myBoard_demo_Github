

class CompletePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listsName: [],
      list:[],
      currentListName:"",
      currentList:[]
    };
    this.refresh = this.refresh.bind(this);
    this.change = this.change.bind(this);
    this.add = this.add.bind(this);
    this.newList = this.newList.bind(this);
    this.throwError = this.throwError.bind(this);
  }

  componentWillMount() {
    var self = this;
    var listsName=[];
      $.getJSON("./data.json",(data,status)=>{
        data.forEach(x => {
          listsName.push({name:x.name,id:x.id});
        });
        self.setState({listsName:listsName,list:data})
  
      })
   
  }
  newList(){
    var list=this.state.list;
    var listsName=this.state.listsName
    var lastId=list[list.length-1].id;
    lastId=Number(lastId);
    lastId=lastId+1
    var status=true;
    list.forEach(x => {
      if (x.name=="New List") {
       status=false;
      }
    });
    if(status){
      list.push({id: lastId,name:"New List",bg:"./img/bgPattern016.jpg",do:[]})
      listsName.push({id:lastId,name:"New List"});
      this.setState({list:list,listsName:listsName})
        
    }else{
      this.throwError("'New List' is already exist, Please rename it first.")
    
    }

}
  refresh(where,listId,doId,newVal) {
    var list=this.state.list;
    var listsName=[];
    if (where=="bg") {
      list.forEach(x => {
        var status=true;
        if (x.name==newVal) {
          status=false;
        }
        if (status) {
          if (x.id==listId) {
            x.bg=newVal;
          }
        }else{
          this.throwError("This list name is already exist, Please chose an other name.")
    
        }
        
      });
    }
    if (where=="listName") {
      
      list.forEach(x => {
        if (x.id==listId) {
          x.name=newVal;
        }
      });
    }
    if (where=="deleteList") {
      list.forEach(x => {
        if (x.id==listId) {
          var a=list.indexOf(x)
          list.splice(a,1);
          this.setState({currentListName:""})
        }
      });
    }
    if (where=="doChangePro") {
      list.forEach(x => {
        if (x.id==listId) {
          x.do.forEach(y=>{
              if (y.id==doId) {
                y.pro=newVal
              }
          })
        }
      });
    }
    if (where=="doDeleteTask") {
      list.forEach(x => {
        if (x.id==listId) {
          x.do.forEach(y=>{
              if (y.id==doId) {
                x.do.splice(x.do.indexOf(y),1)
              }
          })
        }
      });
    }
    if (where=="doChangeText") {
      list.forEach(x => {
        if (x.id==listId) {
          x.do.forEach(y=>{
              if (y.id==doId) {
                y.task=newVal
              }
          })
        }
      });
    }
    list.forEach(x => {
      listsName.push({name:x.name,id:x.id});
    });
    this.setState({list:list,listsName:listsName})
  
  }

  throwError(err) {
    var a =
      '<div class="alert alert-danger alert-dismissible fade show" role="alert">\
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                      <span aria-hidden="true">&times;</span>\
                      <span class="sr-only">Close</span>\
                  </button>\
                  <strong>Failed!</strong> ' +
      err +
      ".\
              </div>";
    $("#showError").html(a);
  }
  
  change(id) {
    var list=this.state.list;
    var currentList;
    list.forEach(x => {
      if (x.id==id) {
        currentList=x;
      }
    });
    this.setState({ currentListName: id,currentList:currentList });
  }
  add() {
    var currentListName=this.state.currentListName;
    var list=this.state.list;
    list.forEach(x => {
      if (x.id==currentListName) {
        var lastDoId=0;
        if (x.do.length!=0) {
          lastDoId=x.do[x.do.length-1].id;
        }
        lastDoId=Number(lastDoId);
        x.do.push({id:lastDoId+1,task:"New Task",pro:"0"})
      }
    });
    this.setState({list:list})
  }
  
  render() {
    var x = [];
    var bg = "./img/bgPattern016.jpg";
   
    return (
      <div className="w-100 h-100">
        <ListDiv
          listStatus={this.state.currentListName}
          listsName={this.state.listsName}
          onRefresh={this.refresh}
          onChange={this.change}
          onNewList={this.newList}
        >
        </ListDiv>
        <BoardDiv
          setListTo={this.setListTo}
          listStatus={this.state.currentListName}
          list={this.state.currentList}
          onRefresh={this.refresh}
          onAdd={this.add}
          onUpdate={this.update}
          onRemove={this.remove}
        >
        </BoardDiv>
      </div>
    );
  }
}
ReactDOM.render(<CompletePage />, document.getElementById("myReact"));

