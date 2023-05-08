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
		this.toggleItemCrossedOff = this.toggleItemCrossedOff.bind(this)
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

	toggleItemSelect(categoryIndex, itemIndex, qty) {
		let stateData = this.state.data
		let newItem = stateData.itemCategories[categoryIndex].items[itemIndex]
		newItem.selected = !newItem.selected
		if (!newItem.selected) newItem.qty = ""
		if (qty) newItem.qty = qty

		stateData.itemCategories[categoryIndex].items[itemIndex] = newItem
		this.saveData(stateData)
	}

	addItem(categoryIndex, itemObj) {
		let stateData = this.state.data
		let newCategoryItems = stateData.itemCategories[categoryIndex].items

		newCategoryItems.push(itemObj)

		// sort alphabetically
		newCategoryItems.sort(
			(a, b) => a.itemName > b.itemName ? 1 : -1
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

		this.saveData(stateData)
	}

	toggleItemCrossedOff(categoryIndex, itemIndex) {
		let stateData = this.state.data
		let newItem = stateData.itemCategories[categoryIndex].items[itemIndex]
		newItem.crossedOff = !newItem.crossedOff
		stateData.itemCategories[categoryIndex].items[itemIndex] = newItem
		this.saveData(stateData)
	}

	render() {
		let currentComponent = null
		if (this.state.page==="list") {
			currentComponent = 
				<List 
					data={this.state.data}
					toggleItemCrossedOff={this.toggleItemCrossedOff}
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
// 					qty: "",
//                  unit: "",
//					crossedOff: false
// 				},
//...

//import/export
//bug with editing category names -> revert to first category
//crossing off logic
//compound text logic