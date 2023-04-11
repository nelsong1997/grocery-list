import React from 'react'
import List from './List.js'
import Items from './Items.js'
import './styles.css';

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			page: "list",
			data: {}
		}

		this.saveNewCategoryName = this.saveNewCategoryName.bind(this)
	}

	componentDidMount() {
		this.setState({data: someData})
	}

	saveNewCategoryName(categoryIndex, newName) {
		let stateData = this.state.data
		stateData.itemCategories[categoryIndex].categoryName = newName
		this.setState({data: stateData})
	}

	render() {
		let currentComponent = null
		if (this.state.page==="list") {
			currentComponent = 
				<List 
					data={this.state.data}
					//saveNewCategoryName={this.saveNewCategoryName}
				/>
		}
		else if (this.state.page==="items") {
			currentComponent =
				<Items
					data={this.state.data}
					saveNewCategoryName={this.saveNewCategoryName}
				/>
		}
		return (
			<div id="center-box">
				<div id="view-select">
					<button onClick={()=>this.setState({page: "list"})}>list</button>
					<button onClick={()=>this.setState({page: "items"})}>items</button>
				</div>
				{currentComponent}
			</div>
		)
	}
}

export default App;

let someData = {
	itemCategories: [
		{
			categoryName: "category 1",
			items: [
				{
					itemName: "banana",
					selected: true,
					qtySelect: false,
					qty: null
				},
				{
					itemName: "apple",
					selected: false,
					qtySelect: true,
					qty: null
				}
			]
		},
		{
			categoryName: "category 2",
			items: [
				{
					itemName: "banana2",
					selected: false,
					qtySelect: false,
					qty: null
				},
				{
					itemName: "apple2",
					selected: false,
					qtySelect: true,
					qty: null
				}
			]
		},
		{
			categoryName: "category 3",
			items: [
				{
					itemName: "banana3",
					selected: false,
					qtySelect: false,
					qty: null
				},
				{
					itemName: "apple3",
					selected: false,
					qtySelect: true,
					qty: null
				}
			]
		},
		{
			categoryName: "category 4",
			items: [
				{
					itemName: "banana4",
					selected: false,
					qtySelect: false,
					qty: null
				},
				{
					itemName: "apple4",
					selected: false,
					qtySelect: true,
					qty: null
				}
			]
		}
	]
}