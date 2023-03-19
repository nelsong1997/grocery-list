import React from 'react'
import './styles.css';

class List extends React.Component {
	constructor() {
		super()
		this.state = {
			property: "value"
		}	
	}

	render() {
		return (
			<div className="center-box">
				<div className="columns">
					<div className="column">
						<div style={{backgroundColor: "blue"}}>uh</div>
						<div style={{backgroundColor: "red"}}>test</div>
					</div>
					<div className="column">
						<div style={{backgroundColor: "green"}}>1</div>
						<div style={{backgroundColor: "purple"}}>2</div>
					</div>
				</div>
			</div>
		)
	}
}

export default List;