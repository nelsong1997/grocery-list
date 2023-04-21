import React from 'react'
import './styles.css';

class Items extends React.Component {
	constructor() {
		super()
		this.state = {
			categoryIndex: 0,
			editingCategoryName: false,
			addingItem: false,
			itemSearch: ""
		}

		this.categoryNameInput = React.createRef()
		this.itemNameInput = React.createRef()

		this.handleCategorySave = this.handleCategorySave.bind(this);
	}

	displayCategoryDropdown() {
		let categories = this.props.data.itemCategories
		let optionsJSX = []
		for (let categoryIndex = 0; categoryIndex < 4; categoryIndex++) {
			let categoryName = categories[categoryIndex].categoryName
			optionsJSX.push(
				<option key={categoryIndex} value={categoryIndex}>{categoryName}</option>
			)
		}

		return (
			<select onChange={(e)=>{this.setState({categoryIndex: e.target.value})}}>
				{optionsJSX}
			</select>
		)
	}

	displayEditCategoryInput() {
		let categories = this.props.data.itemCategories
		let initValue = categories[this.state.categoryIndex].categoryName
		return (
			<input defaultValue={initValue} ref={this.categoryNameInput}/>
		)
	}

	displayItemSearch() {
		return (
			<div>
				<input key="item-search"
					onChange={(e)=>{this.setState({itemSearch: e.target.value})}}
					placeholder="search for item"
				/>
				<button onClick={()=>{this.setState({addingItem: true})}}>new item</button>
			</div>
			
		)
	}

	displayAddItem() {
		return (
			<div>
				<input key="item-name-input"
					ref={this.itemNameInput}
					placeholder="new item name"
				/>
				<button onClick={()=>{this.handleSaveItem()}}>save</button>
				<button
					onClick={()=>{this.setState({addingItem: false, itemSearch: ""})}}
				>x</button>
			</div>
		)
	}

	displayItemList() {
		let categoryIndex = this.state.categoryIndex
		let categoryItems = this.props.data.itemCategories[categoryIndex].items
		
		let itemSearch = this.state.itemSearch

		let itemsJSX = []

		const selectedStyle = {fontWeight: "bold"}
		const unselectedStyle = {fontStyle: "italic", color: "rgb(200,200,200)"}

		for (let i=0; i<categoryItems.length; i++) {
			let item = categoryItems[i]
			let itemName = item.itemName
			let isSelected = item.selected

			if (itemName && !itemName.includes(itemSearch)) continue

			itemsJSX.push(
				<div
					key={i} className="item-box"
					onClick={()=>this.props.toggleItemSelect(categoryIndex, i)}
				>
					<label
						style={isSelected ? selectedStyle : unselectedStyle}
						className="item">{itemName}
					</label>
				</div>
			)
		}

		return(
			<div>
				{itemsJSX}
			</div>
		)
	}

	handleCategoryEdit() {
		this.setState({editingCategoryName: true})
	}

	handleCategorySave() {
		this.props.updateCategoryName(this.state.categoryIndex, this.categoryNameInput.current.value)
		this.setState({editingCategoryName: false})
	}

	handleSaveItem() {
		this.props.addItem(
			this.state.categoryIndex,
			this.itemNameInput.current.value,
			false
		)
	}

	render() {
		return (
			<div id="items-box">
				<div>
					{this.state.editingCategoryName ? this.displayEditCategoryInput() : this.displayCategoryDropdown()}
					<button onClick={()=>{
						this.state.editingCategoryName ? this.handleCategorySave() : this.handleCategoryEdit()
						}}>
							{this.state.editingCategoryName ? "save" : "edit"}
					</button>
				</div>
				<div>
					{this.state.addingItem ? this.displayAddItem() : this.displayItemSearch()}
				</div>
				<div>
					{this.displayItemList()}
				</div>
			</div>
		)
	}
}

export default Items;