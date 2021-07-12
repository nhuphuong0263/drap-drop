import React from "react"
import { truncate } from '../function/index'
import Modal from "../components/Modal"
import Backdrop from "../components/Backdrop"

class Column extends React.Component {

  render() {
    return (
      <div className="wrapper">
        <div className="day">
          {this.props.title}
        </div>
        <div className='Column'>
          <div className='header'>
            {this.props.date}
          </div>
          <div className="dragZone" onDrop={this.props.drop} onDragOver={this.props.ondragover}>
            {this.props.items.map((item, key) => {
              return <div id={item.id} key={key} className="card" draggable="true" onDragStart={this.props.drag}>
                <div className='titleGroup'>{truncate(item.groupName, 25)} <i className="fa fa-ellipsis-h"></i></div>
                {item.exercises.map((exe, index) => {
                  return <div key={index} id={`index${index}`} className='boxExe' draggable="true" onDragStart={this.props.drag}>
                      <div className='nameExe'>{exe.name}</div>
                      <div className='info'>
                        <div className='total'>{exe.info.length}x</div>
                        <div className='detail'>{exe.info}</div>
                      </div>
                  </div>
                })}
                <div className='icon'><i className="fas fa-plus" onClick={() => this.props.create()}></i></div>
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}
class Trello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      'columns': 
        {
          "mon": {
            title: "mon",
            items: [
              {
                id: "id" + Math.random().toString(16).slice(2),
                groupName: "Chest Day - with Arm exercises",
                exercises: [
                  {
                    name: "Bench Press Med...",
                    info: ["50 lb x 5", "60 lb x 5", "70 lb x 5"]
                  },
                  {
                    name: "Exercise B",
                    info: ["40 lb x 10"]
                  }
                ]
              }
            ],
            date: "05",
          },
          "tue" : {
            title: "tue",
            items: [
              {
                id: "id" + Math.random().toString(16).slice(2),
                groupName: "Leg DaY",
                exercises: [
                  {
                    name: "Exercise C",
                    info: ["30 lb x 6"]
                  },
                  {
                    name: "Exercise D",
                    info: ["40 lb x 6"]
                  },
                  {
                    name: "Exercise E",
                    info: ["50 lb x 6"]
                  },
                ]
              }, 
              {
                id: "id" + Math.random().toString(16).slice(2),
                groupName: "Arm day",
                exercises: [
                  {
                    name: "Exercise F",
                    info: ["60 lb x 6"]
                  },
                ]
              }
            ],
            date: "06"
          },
          "web" : {
            title: "web",
            items: [],
            date: "07"
          },
          "thu" : {
            title: "thu",
            items: [],
            date: "08"
          },
          "fri" : {
            title: "fri",
            items: [],
            date: "09"
          },
          "sat" : {
            title: "sat",
            items: [],
            date: "10"
          },
          "sun" : {
            title: "sun",
            items: [],
            date: "11"
          }
        },
      modalIsOpen: false
    }
  }
  openNewExercise = () => {
    this.setState({
      modalIsOpen: true
    })
  }
  closeModalHandler = () => {
    this.setState({modalIsOpen: false})
  }
  confirmModalHandler = () => {
    this.setState({modalIsOpen: false})
  }

  allowDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
  }
  drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  drop = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log({data})
    ev.target.appendChild(document.getElementById(data));
  }
  onDragStart = (ev) => {
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text", ev.target.getAttribute("id"));
  }
  addExercise = (exercise) => {
    console.log({exercise})
    Object.keys(this.state.columns).map((item, key) => {
      const items = this.state.columns[item].items
      // const exercises = this.state.columns[item].items.exercises

      items.map(item => {
        const data = {
          id: exercise.id,
          groupName: exercise.groupName,
          exercises: exercise.info
        }
        return data
      })
      
    })
  }
  render() {
    const { modalIsOpen } = this.state
    return (
      <div className="Trello">
        {Object.keys(this.state.columns).map((item, key) => (
          <Column
            key={key}
            title={this.state.columns[item].title}
            date={this.state.columns[item].date}
            drag={this.drag}
            drop={this.drop}
            ondragover={this.allowDrop}
            onDragStart={this.onDragStart}
            create={() => this.openNewExercise(this.state.columns[item].items)}
            items={this.state.columns[item].items}
          ></Column>
        ))}
        {modalIsOpen && <Modal onCancel={this.closeModalHandler} onConfirm={this.confirmModalHandler} onAddExercise={this.addExercise} />}
        {modalIsOpen && <Backdrop onCancel={this.closeModalHandler} />}
      </div>
    );
  }
}

export default Trello