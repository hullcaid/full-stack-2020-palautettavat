import React from 'react'

const Notification = ({ message, type }) => {
	const notificationStyle = {
		color: 'green',
  		background: 'lightgrey',
  		fontSize: 18,
  		borderStyle: 'solid',
  		borderRadius: 3,
  		padding: 10,
  		marginBottom: 10
	}
	
	const errorStyle = {
		color: 'red',
  		background: 'lightgrey',
  		fontSize: 18,
  		borderStyle: 'solid',
  		borderRadius: 3,
  		padding: 10,
  		marginBottom: 10
	}

	if (type === null) {
		return null
	} else {
		if (type === "error"){
			return (
				<div className="error" style= {errorStyle}>
					{message}
				</div>
			)
		}
		else if (type === "notification") {
			return (
				<div className="notification" style={notificationStyle}>
					{message}
				</div>
			)
		}
	}
}

export default Notification