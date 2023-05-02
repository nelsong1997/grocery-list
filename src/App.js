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

		this.updateCategoryName = this.updateCategoryName.bind(this)
		this.toggleItemSelect = this.toggleItemSelect.bind(this)
		this.addItem = this.addItem.bind(this)
		this.deleteItem = this.deleteItem.bind(this)
	}

	// load data
	componentDidMount() {
		let dataStr = localStorage.getItem("data")

		const defaultData = {
			itemCategories: [
				{
					categoryName: "category 1",
					items: []
				},
				{
					categoryName: "category 2",
					items: []
				},
				{
					categoryName: "category 3",
					items: []
				},
				{
					categoryName: "category 4",
					items: []
				}
			]
		}


		let theData = defaultData

		try {
			theData = JSON.parse(dataStr)
		} catch (err) {
			theData = defaultData
		}

		if (!theData) theData = defaultData // null/undf

		// sort items alphabetically
		for (let i=0; i<4; i++) {
			theData.itemCategories.sort(
				(a, b) =>  a.itemName > b.itemName ? 1 : -1
			)
		}

		this.saveData(theData)
	}

	saveData(data) {
		localStorage.setItem("data", JSON.stringify(data))
		this.setState({data: data})
	}

	updateCategoryName(categoryIndex, newName) {
		let stateData = this.state.data
		stateData.itemCategories[categoryIndex].categoryName = newName
		this.saveData(stateData)
	}

	toggleItemSelect(categoryIndex, itemIndex) {
		let stateData = this.state.data
		stateData.itemCategories[categoryIndex].items[itemIndex].selected =
			!stateData.itemCategories[categoryIndex].items[itemIndex].selected
		this.saveData(stateData)
	}

	addItem(categoryIndex, itemName, qtySelect) {
		let stateData = this.state.data
		let newCategoryItems = stateData.itemCategories[categoryIndex].items

		newCategoryItems.push({
			itemName: itemName,
			selected: true,
			crossedOff: false,
			qtySelect: qtySelect,
			qty: 1
		})

		newCategoryItems.sort(
			(a, b) =>  a.itemName > b.itemName ? 1 : -1
		)

		stateData.itemCategories[categoryIndex].items = newCategoryItems

		this.saveData(stateData)
	}

	deleteItem(categoryIndex, itemIndex) {
		let stateData = this.state.data
		let newCategoryItems = stateData.itemCategories[categoryIndex].items
		// delete item
		newCategoryItems = newCategoryItems.slice(
			0, itemIndex).concat(
				newCategoryItems.slice(
					itemIndex+1, newCategoryItems.length))
		stateData.itemCategories[categoryIndex].items = newCategoryItems
		this.setState({data: stateData})
	}

	render() {
		let currentComponent = null
		if (this.state.page==="list") {
			currentComponent = 
				<List 
					data={this.state.data}
				/>
		}
		else if (this.state.page==="items") {
			currentComponent =
				<Items
					data={this.state.data}
					updateCategoryName={this.updateCategoryName}
					toggleItemSelect={this.toggleItemSelect}
					addItem={this.addItem}
					deleteItem={this.deleteItem}
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

// let someData = {
// 	itemCategories: [
// 		{
// 			categoryName: "category 1",
// 			items: [
// 				{
// 					itemName: "banana",
// 					selected: true,
// 					qtySelect: false,
// 					qty: null,
//					crossedOff: false
// 				},
// 				{
// 					itemName: "apple",
// 					selected: false,
// 					qtySelect: true,
// 					qty: null,
//					crossedOff: false
// 				}
// 			]
// 		},
// 		{
// 			categoryName: "category 2",
// 			items: [
// 				{
// 					itemName: "banana2",
// 					selected: false,
// 					qtySelect: false,
// 					qty: null,
//					crossedOff: false
// 				},
// 				{
// 					itemName: "apple2",
// 					selected: false,
// 					qtySelect: true,
// 					qty: null,
//					crossedOff: false
// 				}
// 			]
// 		},
// 		{
// 			categoryName: "category 3",
// 			items: [
// 				{
// 					itemName: "banana3",
// 					selected: false,
// 					qtySelect: false,
// 					qty: null,
//					crossedOff: false
// 				},
// 				{
// 					itemName: "apple3",
// 					selected: false,
// 					qtySelect: true,
// 					qty: null,
//					crossedOff: false
// 				}
// 			]
// 		},
// 		{
// 			categoryName: "category 4",
// 			items: [
// 				{
// 					itemName: "banana4",
// 					selected: false,
// 					qtySelect: false,
// 					qty: null,
//					crossedOff: false
// 				},
// 				{
// 					itemName: "apple4",
// 					selected: false,
// 					qtySelect: true,
// 					qty: null,
//					crossedOff: false
// 				}
// 			]
// 		}
// 	]
// }