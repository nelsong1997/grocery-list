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
		if (this.state.page==="list") return <List />
		//else if (this.state.page==="items") return <Items />
	}
}

export default App;