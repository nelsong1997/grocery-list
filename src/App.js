import React from 'react'
import List from './List.js'
import Items from './Items.js'
import './styles.css';

import Papa from 'papaparse'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			page: "list",
			data: {},
			clearingSelections: false,
			uploading: false,
			uploadError: ""
		}

		this.fileInput = React.createRef()

		this.updateCategoryName = this.updateCategoryName.bind(this)
		this.toggleItemSelect = this.toggleItemSelect.bind(this)
		this.addItem = this.addItem.bind(this)
		this.deleteItem = this.deleteItem.bind(this)
		this.toggleItemCrossedOff = this.toggleItemCrossedOff.bind(this)
	}

	// ---- Load Data ---- //
	componentDidMount() {
		let dataStr = localStorage.getItem("data")

		


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

	// ---- Save Data ---- //

	saveData(data) {
		localStorage.setItem("data", JSON.stringify(data))
		this.setState({data: data})
	}

	// ---- Manage Global Data/State ---- //

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

	// ---- Display ---- //

	displayClearConfirm() {
		return (
			<div>
				<div id="dimmer">
					<div id="clear-selections">
						<div className="form-row">
							<strong><label>Really clear all selections?</label></strong>
						</div>
						<div className="form-row">
							<button onClick={()=>this.setState({clearingSelections: false})}>cancel</button>
							<button onClick={()=>this.handleClearSelections()}>confirm</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	displayUploadMenu() {
		let errorText = this.state.uploadError
		let errorJSX = null
		if (errorText) {
			errorJSX = [
				<div className="form-row" key="0">
					<strong><label style={{color: "red"}}>{errorText}</label></strong>
				</div>
			]
		}

		return (
			<div>
				<div id="dimmer">
					<div id="upload-menu">
						<div className="form-row">
							<strong><label>Warning: uploading will erase all current data.</label></strong>
						</div>
						<div className="form-row">
							<label>Upload a CSV. For formatting, try downloading first.</label>
						</div>
						{errorJSX}
						<div className="form-row">
							<button onClick={()=>this.setState({uploading: false, uploadError: ""})}>cancel</button>
							<button onClick={()=>this.fileInput.current.click()}>choose file</button>
							<input
								accept=".csv"
								type="file"
								style={{display: "none"}}
								ref={this.fileInput}
								onChange={()=>this.handleFileUpload()}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// ---- Handlers ---- //

	handleClearSelections() {
		let newStateData = this.state.data
		let newItemCategories = newStateData.itemCategories

		//categories
		for (let i=0; i<4; i++) {
			//items
			for (let j=0; j < newItemCategories[i].items.length; j++) {
				newItemCategories[i].items[j].selected = false
				newItemCategories[i].items[j].qty = ""
				newItemCategories[i].items[j].crossedOff = false
			}
		}

		newStateData.itemCategories = newItemCategories

		this.saveData(newStateData)
		this.setState({clearingSelections: false})
	}

	handleDownloadData() {
		let stateData = this.state.data
		let itemCategories = stateData.itemCategories
		

		let rowsArr = [
			//include category names every 4 columns
			[
				itemCategories[0].categoryName, '', '', '', '',
				itemCategories[1].categoryName, '', '', '', '',
				itemCategories[2].categoryName, '', '', '', '',
				itemCategories[3].categoryName, '', '', '', ''
			],
			//hardcode column headers
			[
				'qty', 'unit', 'inputQty', 'item name', 'selected',
				'qty', 'unit', 'inputQty', 'item name', 'selected',
				'qty', 'unit', 'inputQty', 'item name', 'selected',
				'qty', 'unit', 'inputQty', 'item name', 'selected'
			]
		]

		let longestListLength = Math.max(
			itemCategories[0].items.length,
			itemCategories[1].items.length,
			itemCategories[2].items.length,
			itemCategories[3].items.length
		)

		//start at row 2 since we already added 2 rows manually
		for (let row = 2; row < longestListLength + 2; row++) {
			let dataIdx = row - 2
			rowsArr.push([])
			for (let catId = 0; catId < 4; catId++) {
				let itemObj = itemCategories[catId].items[dataIdx]
				//we've hit the end of the list for this category
				if (!itemObj) {
					rowsArr[row].push('', '', '', '', '')
					continue
				}

				// 1st and 2nd columns for cat
				if (!itemObj.inputQty) {
					//qty and unit are blank when we don't input qty
					rowsArr[row].push('', '')
				} else {
					if (!itemObj.selected) {
						//qty is blank when not selected
						rowsArr[row].push('')
					} else {
						rowsArr[row].push(itemObj.qty)
					}
					//populate unit
					rowsArr[row].push(itemObj.unit)
				}

				// 3rd column - input qty (Y/N)?
				if (itemObj.inputQty) rowsArr[row].push('Y')
				else rowsArr[row].push('N')

				// 4rd column - item name
				rowsArr[row].push(itemObj.itemName)

				// 5th column - selected - x for selected, blank for not
				if (itemObj.selected) rowsArr[row].push('x')
				else rowsArr[row].push('')
			}
		}

		let csvStr = Papa.unparse(rowsArr)

		let now = new Date()
		let dateStr = now.toLocaleDateString('en-us').replaceAll('/', '-')

		// https://theroadtoenterprise.com/blog/how-to-download-csv-and-json-files-in-react
		let blob = new Blob([csvStr], { type: 'text/csv' })
		
		let a = document.createElement('a')
		a.download = `grocery list ${dateStr}.csv`
		a.href = window.URL.createObjectURL(blob)
		let clickEvt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		})
		a.dispatchEvent(clickEvt)
		a.remove()
	}

	async handleFileUpload() {
		this.setState({uploadError: ""})

		let theFile = this.fileInput.current.files[0]
		
		if (!theFile.name.toLowerCase().endsWith(".csv")) {
			this.setState({uploadError: "Error: file must be a CSV"})
			return
		}

		// defining function so I can use await
		function parseFile(file) {
			return new Promise(resolve => {
				Papa.parse(file, {
					complete: results => resolve(results)
				})
			})
		};

		let parseResult = await parseFile(theFile)

		if (parseResult.errors.length) {
			this.setState({uploadError: "Error: CSV Parsing error"})
			return
		}

		let fileRows = parseResult.data

		let newStateData = defaultData

		//set category names
		let headerRow = fileRows[0]
		for (let i=0; i<4; i++) {
			let categoryIndex = i
			let columnIndex = i*5
			if (headerRow[columnIndex]) {
				newStateData.itemCategories[categoryIndex].categoryName = headerRow[columnIndex]
			}	
		}

		//read file into data object

		//track when we have reached the end of each category
		let categoryEnds = [false, false, false, false]

		//start at 2 to skip headers
		for (let i=2; i<fileRows.length; i++) {
			let fileRow = fileRows[i]
			//categories
			for (let j=0; j<4; j++) {
				let firstColIdx = j*5

				//item name is blank or we already reached end of category
				if (!fileRow[firstColIdx + 3] || categoryEnds[j]) {
					categoryEnds[j] = true
					continue
				}

				// raw read
				let newItemObj = {
					itemName: fileRow[firstColIdx + 3],
					selected: fileRow[firstColIdx + 4].toLowerCase() === 'x',
					inputQty: fileRow[firstColIdx + 2].toUpperCase() === 'Y',
					qty: fileRow[firstColIdx],
					unit: fileRow[firstColIdx + 1],
					crossedOff: false
				}

				//correct stuff
				if (!newItemObj.inputQty) {
					newItemObj.qty = ""
					newItemObj.unit = ""
				}

				if (newItemObj.qty && isNaN(Number(newItemObj.qty))) newItemObj.qty = ""

				//add it
				newStateData.itemCategories[j].items.push(newItemObj)
			}
		}

		this.saveData(newStateData)
		this.setState({uploading: false})
	}

	// ---- Render ---- //

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
				{this.state.clearingSelections ? this.displayClearConfirm() : null}
				{this.state.uploading ? this.displayUploadMenu() : null}
				<div id="view-select">
					<button onClick={()=>this.setState({page: "list"})}>list</button>
					<button onClick={()=>this.setState({page: "items"})}>items</button>
					<button onClick={()=>this.setState({clearingSelections: true})}>clear</button>
					<button onClick={()=>this.handleDownloadData()}>↓</button>
					<button onClick={()=>this.setState({uploading: true})}>↑</button>
				</div>
				{currentComponent}
			</div>
		)
	}
}

export default App;

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

// let someData = {
// 	itemCategories: [
// 		{
// 			categoryName: "category 1",
// 			items: [
// 				{
// 					itemName: "banana",
// 					selected: true,
// 					inputQty: false,
// 					qty: "",
//                  unit: "",
//					crossedOff: false
// 				},
//...

//import/export
//ellipses on items