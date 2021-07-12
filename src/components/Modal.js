import React, { useRef, useState } from 'react' 
import classes from './Modal.module.css'
import DropDown from './Dropdown'

const dropdownOptions = [
  {
    label: "Chest Day - with Arm exercises",
    value: "chestday",
  },
  {
    label: "Bench Press Med...",
    value: "benchpress",
  },
  {
    label: "Exercise B",
    value: "exerciseb",
  },
]

const dropdownInfo = [
  {
    label: "50 lb x 5",
    value: "i50x5"
  }, 
  {
    label: "60 lb x 5",
    value: "i60x5"
  },
  {
    label: "70 lb x 5",
    value: "i70x5"
  },
  {
    label: "40 lb x 10",
    value: 'i40x10'
  },
  {
    label: "30 lb x 6",
    value: "i30x6"
  }
]

function Modal({ onCancel, onConfirm, onAddExercise }) {
  const [ selected, setSelected ] = useState(dropdownOptions[0])
  const [ infoSelected, setInfoSelected] = useState(dropdownInfo[0])
  const titleInputRef = useRef()

  function cancelHandler() {
    onCancel()
  }

  function submitHandler(event) {
    event.preventDefault()

    const enteredTitle = titleInputRef.current.value
    const enteredGroupName = selected
    const enteredInfoName = infoSelected

    const exercises = {
      id: "id" + Math.random().toString(16).slice(2),
      title: enteredTitle,
      groupName: enteredGroupName,
      info: enteredInfoName
    }

    onAddExercise(exercises)
    onConfirm()
  }

  return (
    <div className='modal'>
      <h2>Add New Exercise</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='group'>Group Name</label>
          <DropDown
            label=""
            options={dropdownOptions}
            selected={selected}
            onSelectedChange={setSelected}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='title'>Exercise Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='info'>Info</label>
          <DropDown
            label=""
            options={dropdownInfo}
            selected={infoSelected}
            onSelectedChange={setInfoSelected}
          />
        </div>
        <div className={classes.actions}>
          <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
          <button className='btn' type='submit' onClick={submitHandler}>Confirm</button>
        </div>
      </form>
    </div>
  )
}

export default Modal