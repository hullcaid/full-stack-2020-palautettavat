import React from 'react'

const PersonForm = ({nameInput, numberInput, handleNameChange, handleNumberChange, handleSubmit}) => {
	return(
		<form onSubmit={handleSubmit}>
        <div>
          name: <input 
		      	value={nameInput}
			      onChange={handleNameChange}
		      />
        </div>
        <div>
          number: <input
            value={numberInput}
            onChange={handleNumberChange} 
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}

export default PersonForm