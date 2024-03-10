
class BoardDiv extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        setting: false,
        showStyle: false,
        background: "url('./img/bgPattern016.jpg')",
      };
      
      this.refresh = this.refresh.bind(this);
      this.printNote = this.printNote.bind(this);
      this.add = this.add.bind(this);
      this.setting = this.setting.bind(this);
      this.showSet = this.showSet.bind(this);
      this.showMenu = this.showMenu.bind(this);
      this.throwError = this.throwError.bind(this);
      this.changeBg = this.changeBg.bind(this);
      this.changeListName = this.changeListName.bind(this);
      this.openDeleteDiv = this.openDeleteDiv.bind(this);
      this.closeDeleteDiv = this.closeDeleteDiv.bind(this);
      this.deleteList = this.deleteList.bind(this);
      this.renderBtn = this.renderBtn.bind(this);
      this.renderName = this.renderName.bind(this);
      this.renderLogo = this.renderLogo.bind(this);
    }
    componentWillMount() {
      (this.style = {
        height: window.innerHeight + "px",
      }),
        (this.styleSettingDiv0 = {
          opacity: 0,
          display: "none",
        }),
        (this.styleSettingDiv1 = {
          opacity: 1,
          display: "block",
        });
    }
    componentDidMount() { 
      $('[data-toggle="tooltip"]').tooltip()
     }
    
    refresh(where,listId,doId,newVal) {
      listId=this.props.listStatus;
      this.props.onRefresh(where,listId,doId,newVal);
    }
    printNote(x) {
      return (
        <Note
          onRefresh={this.refresh}
          taskId={x.id}
        >
          {x}
        </Note>
      );
    }
    add() {
      if (this.props.listStatus == "") {
        this.throwError("Please choose a list");
      } else {
        this.props.onAdd();
      }
    }
    setting() {
      if (this.state.setting) {
        this.setState({ setting: false });
      } else {
        this.setState({ setting: true });
      }
    }
    showSet() {
      if (this.state.setting) {
        return this.styleSettingDiv1;
      } else {
        return this.styleSettingDiv0;
      }
    }
  
    showMenu(x) {
      if (this.state.showStyle) {
        this.setState({ showStyle: false });
        x.target.nextSibling.style = "display:none";
      } else {
        this.setState({ showStyle: true });
        x.target.nextSibling.style = "display:block";
      }
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
    changeBg(x) {
      var self = this;
      var a = x.target.innerText;
      var bg = "./img/bg" + a + ".jpg";
      var list = this.props.listStatus;
      this.props.onRefresh("bg",list,"",bg)
    }
    changeListName() {
      var newName = ReactDOM.findDOMNode(this.refs.newListNameInput).value;
      var id = this.props.listStatus;
      if (newName=="") {
        this.throwError("Please chose a name")
      }else{
      this.props.onRefresh("listName",id,"",newName);
      this.setState({setting:false})
      ReactDOM.findDOMNode(this.refs.newListNameInput).value=""
   
      }
     }
    openDeleteDiv(x) {
      var elm = x.target;
      $(elm).next().slideToggle("1000");
    }
    closeDeleteDiv(x) {
      var elm = x.target;
      $(elm).parent().parent().slideUp("1000");
    }
    deleteList() {
      var id = this.props.listStatus;
      this.props.onRefresh("deleteList",id,"","")
      this.setState({setting:false})
    }
    renderBtn() {
      var bg;
      var bgCode;
      var bgText;
      var list=this.props.list;
        if (list.id== this.props.listStatus) {
          bg = list.bg;
          $(".bg-img").css("background", "url('" + bg + "')");
          bgCode = bg.slice(22, 25);
          bgText = "Pattern " + bgCode;
        }
      
  
      if (this.props.listStatus != "") {
        return (
          <div className="btn-pattern">
            <div className="addBtn d-flex ">
              <button className="btn btn-success mx-1 " title="Setting" onClick={this.setting}>
                <i className="fas fa-cog"></i>
              </button>
              <button className="btn btn-light  mx-1" title="Add New Task" data-toggle="tooltip" data-placement="bottom" onClick={this.add}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="btnDiv p-2" style={this.state.setting?this.styleSettingDiv1:this.styleSettingDiv0}>
              <div className="patternDiv">
                <h6 className="text-center">
                  Change pattern:<i className="fas fa-arrow-alt-circle-down"></i>
                </h6>
                <div>
                  <button className="btn btn-block btn-dark" onClick={this.showMenu}>
                    {bgText} 
                  </button>
                  <div className="listPattern">
                    <ul className="list-group ">
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode001.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern001
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode002.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern002
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode003.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern003
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode004.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern004
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode005.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern005
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode006.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern006
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode007.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern007
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode008.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern008
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode009.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern009
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode010.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern010
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode011.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern011
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode012.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern012
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode013.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern013
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode014.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern014
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode015.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern015
                      </li>
                      <li className="list-group-item" onClick={this.changeBg}>
                        <img
                          className="mr-1"
                          src="./img/bgCode016.jpg"
                          width="20"
                          alt="pattern"
                        />
                        Pattern016
                      </li>
                    </ul>
                  </div>
                </div>
                <h6 className="text-center mt-2">List Name:</h6>
                <div>
                  <input
                    ref="newListNameInput"
                    className="w-80 form-control text-center"
                    type="text"
                    placeholder="New Name "
                  />
                  <button
                    className="btn btn-outline-success btn-block mt-2 "
                    onClick={this.changeListName}
                  >
                    <i className="fas fa-check-circle fa-lg"></i>
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-danger mt-2 btn-block"
                    onClick={this.openDeleteDiv}
                  >
                    Delete List
                  </button>
                  <div className="delDiv p-2">
                    <h6>
                      Are you sure to <b>delete</b> list?
                    </h6>
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-danger my-2"
                        onClick={this.deleteList}
                      >
                        Yes
                      </button>
                      <button
                        className="btn btn-primary my-2"
                        onClick={this.closeDeleteDiv}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    renderName() {
      return (
        <div className="listName">
          <h6 className="text-center ">{ this.props.listStatus? this.props.list.name:""}</h6>
        </div>
      );
    }
    renderLogo() {
      return (
        <a
          href="https://shoaibnorouzi.alwaysdata.net"
          target="_blank"
          alt="Ahmad Shoaib Norouzi"
          title="Ahmad Shoaib Norouzi"
        >
          <div className="main-logo rounded-circle ">
            <span className="display-2 font-italic ">A</span>
            <span className="display-4 font-italic ">s</span>
  
            <span className="display-4 font-italic ">n</span>
          </div>
        </a>
      );
    }
    render() {
      return (
        <div className="w-100  bg-img p-2" style={this.style}>
          {this.renderName()}
          {this.renderBtn()}
          {this.renderLogo()}
          <div className="">{ this.props.listStatus? this.props.list.do.map(this.printNote) :"" }</div>
          <div className="myFooter">
             2022 - By{" "}
            <a
              className="text-dark"
              target="_blank"
              href="https://shoaibnorouzi.alwaysdata.net"
              alt=" Shoaib Norouzi"
              title=" Shoaib Norouzi"
            >
               Shoaib Norouzi
            </a>
          </div>
        </div>
      );
    }
  }