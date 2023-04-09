import React from 'react'
import List from './List.js'
import './styles.css';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			page: "list"
		}	
	}

	render() {
		let currentComponent = null
		if (this.state.page==="list") currentComponent = <List />
		//else if (this.state.page==="items") currentComponent = <Items />
		return (
			<div id="center-box">
				<div id="view-select">
					<button>list</button>
					<button>items</button>
				</div>
				{currentComponent}
			</div>
		)
	}
}

export default App;