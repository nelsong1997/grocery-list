import React from 'react'
import './styles.css';

class Items extends React.Component {
	constructor() {
		super()
		this.state = {
			categoryIndex: 0,
			editingCategoryName: false,
			addingItem: false,
			itemSearch: "",
			addItemForm: {
				itemName: "",
				inputQty: false,
				qty: null,
				unit: ""
			}
		}

		this.categoryNameInput = React.createRef()

		this.handleCategorySave = this.handleCategorySave.bind(this);
		this.handleAddFormEdit = this.handleAddFormEdit.bind(this);
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
			<input
				defaultValue={initValue}
				ref={this.categoryNameInput}
				className="txt-input"
			/>
		)
	}

	displayItemSearch() {
		return (
			<div>
				<input key="item-search"
					onChange={(e)=>{this.setState({itemSearch: e.target.value})}}
					placeholder="search for item"
					className="txt-input"
				/>
				<button onClick={()=>{this.setState({addingItem: true})}}>new item</button>
			</div>
			
		)
	}

	displayAddItem() {
		let qtyInputs = null
		if (this.state.addItemForm.inputQty) {
			qtyInputs = [<div key="qty-inputs">
				<input
					placeholder="qty"
					className="txt-input sm-input"
					onChange={(e)=>{this.handleAddFormEdit(e, "qty")}}
					type="number"
				/>
				<input
					placeholder="unit"
					className="txt-input sm-input"
					onChange={(e)=>{this.handleAddFormEdit(e, "unit")}}
				/>
			</div>]
		}

		return (
			<div>
				<div id="dimmer">
					<div id="add-item">
						<div className="form-row">
							<input
								placeholder="new item name"
								className="txt-input"
								onChange={(e)=>{this.handleAddFormEdit(e, "itemName")}}
							/>
						</div>
						<div className="form-row">
							<input
								type="checkbox"
								className="cbox"
								onChange={(e)=>{this.handleAddFormEdit(e, "inputQty")}}
							/>
							<strong><label>input qty?</label></strong>
						</div>
						{qtyInputs}
						<div className="form-row">
							<button onClick={()=>this.handleOpenAddForm()}>cancel</button>
							<button>add</button>
						</div>
					</div>
				</div>
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

		let editing = this.state.editingCategoryName

		for (let i=0; i<categoryItems.length; i++) {
			let item = categoryItems[i]
			let itemName = item.itemName
			let isSelected = item.selected

			if (itemName && !itemName.includes(itemSearch)) continue

			let deleteButton = null
			if (editing) {
				deleteButton = [<button
					key={`dlt-${i}`}
					className="delete-button"
					onClick={()=>this.props.deleteItem(categoryIndex, i)}
				>x
				</button>]
			}

			itemsJSX.push(
				<div
					key={i} className="item-box"
					onClick={() => this.props.toggleItemSelect(categoryIndex, i)}
				>
					<label
						style={isSelected ? selectedStyle : unselectedStyle}
						className="item">{itemName}
					</label>
					{deleteButton}
				</div>
			)
		}

		return itemsJSX
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

	handleOpenAddForm() {
		this.setState({
			addingItem: false,
			addItemForm: {
				itemName: "",
				inputQty: false,
				qty: null,
				unit: ""
			}
		})
	}

	handleAddFormEdit(e, field) {
		let addFormObj = this.state.addItemForm
		let newValue = e.target.value
		if (field==="inputQty") newValue = e.target.checked
		addFormObj[field] = newValue
		this.setState({addItemForm: addFormObj})
	}

	render() {
		return (
			<div id="items-box">
				{this.state.addingItem ? this.displayAddItem() : null}
				<div>
					{this.state.editingCategoryName ? this.displayEditCategoryInput() : this.displayCategoryDropdown()}
					<button onClick={()=>{
						this.state.editingCategoryName ? this.handleCategorySave() : this.handleCategoryEdit()
						}}>
							{this.state.editingCategoryName ? "save" : "edit"}
					</button>
				</div>
				<div>
					{this.displayItemSearch()}
				</div>
				<div id="item-list">
					{this.displayItemList()}
				</div>
			</div>
		)
	}
}

export default Items;