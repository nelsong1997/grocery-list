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
				qty: "",
				unit: ""
			},
			inputtingQty: false,
			inputQtyItemIndex: null
		}

		this.categoryNameInput = React.createRef()
		this.qtyInput = React.createRef()

		this.handleCategorySave = this.handleCategorySave.bind(this);
		this.handleAddFormEdit = this.handleAddFormEdit.bind(this);
	}

	// ---- Display ---- //

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
			<select 
				onChange={(e)=>{this.setState({categoryIndex: e.target.value})}}
				value={this.state.categoryIndex}
			>
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
		let editing = this.state.editingCategoryName
		return (
			<div>
				<input key="item-search"
					onChange={(e)=>{this.setState({itemSearch: e.target.value})}}
					placeholder="search for item"
					className="txt-input"
				/>
				<button
					onClick={()=>{this.handleOpenAddForm()}}
					disabled={editing}
				>new item</button>
			</div>
			
		)
	}

	displayAddItemForm() {
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
								autoFocus={true}
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
							<button onClick={()=>this.setState({addingItem: false})}>cancel</button>
							<button onClick={()=>this.handleAddItem()}>add</button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	displayInputQtyForm() {
		let categoryIndex = this.state.categoryIndex
		let itemIndex = this.state.inputQtyItemIndex

		let itemObj = this.props.data.itemCategories[categoryIndex].items[itemIndex]

		return (
			<div>
				<div id="dimmer">
					<div id="input-qty">
						<div className="form-row">
							<strong><label>{itemObj.itemName}</label></strong>
						</div>
						<div className="form-row">
							<input
								autoFocus={true}
								placeholder="qty"
								className="txt-input sm-input"
								type="number"
								ref={this.qtyInput}
							/>
							<strong><label>{itemObj.unit}</label></strong>
						</div>
						<div className="form-row">
							<button onClick={()=>this.setState({inputtingQty: false})}>cancel</button>
							<button
								onClick={()=>this.handleSelectQtyItem(this.qtyInput.current.value)}
							>
							select</button>
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
		let pointerStyle = {cursor: "pointer"}

		for (let i=0; i<categoryItems.length; i++) {
			let item = categoryItems[i]
			let itemName = item.itemName
			let isSelected = item.selected
			let inputQty = item.inputQty
			let qty = ""
			let unit = ""
			if (inputQty && isSelected) {
				qty = item.qty
				//if there's no qty, don't display unit
				unit = qty ? item.unit : ''
			}

			let itemText = `${qty ? `${qty} ` : ``}${unit ? `${unit} ` : ``}${itemName}`

			if (itemText && !itemText.includes(itemSearch)) continue

			let deleteButton = null
			if (editing) {
				deleteButton = [
				<div><button
					key={`dlt-${i}`}
					className="delete-button"
					onClick={()=>this.props.deleteItem(categoryIndex, i)}
				>x
				</button></div>]
			}

			let itemStyleObj = isSelected ? selectedStyle : unselectedStyle
			if (!editing) itemStyleObj.cursor = "pointer"

			itemsJSX.push(
				<div
					key={i} className="item-box"
					style={!editing ? pointerStyle : null}
					onClick={!editing ? ()=>this.handleItemClick(categoryIndex, i, inputQty, isSelected) : null}
				>
					<label
						style={itemStyleObj}
						className="item">{itemText}
					</label>
					{deleteButton}
				</div>
			)
		}

		return itemsJSX
	}

	// ---- Handlers ---- //

	handleCategoryEdit() {
		this.setState({editingCategoryName: true})
	}

	handleCategorySave() {
		this.props.updateCategoryName(this.state.categoryIndex, this.categoryNameInput.current.value)
		this.setState({editingCategoryName: false})
	}

	handleAddItem() {
		let theState = this.state
		let addItemForm = theState.addItemForm
		let categoryIndex = theState.categoryIndex
		let newItem = addItemForm

		newItem.selected = true
		newItem.crossedOff = false
		if (!newItem.inputQty) {
			newItem.qty = ""
			newItem.unit = ""
		}

		this.props.addItem(categoryIndex, newItem)
		this.setState({addingItem: false})
	}

	handleOpenAddForm() {
		this.setState({
			addingItem: true,
			addItemForm: {
				itemName: "",
				inputQty: false,
				qty: "",
				unit: ""
			}
		})
	}

	handleAddFormEdit(e, field) {
		let addFormObj = this.state.addItemForm
		let newValue = e.target.value
		if (field==="inputQty") {
			newValue = e.target.checked
			if (!newValue) {
				addFormObj.qty = ""
				addFormObj.unit = ""
			}
		}
		addFormObj[field] = newValue
		this.setState({addItemForm: addFormObj})
	}

	handleItemClick(categoryIndex, itemIndex, inputQty, isSelected) {
		if (inputQty && !isSelected) {
			this.setState({inputtingQty: true, inputQtyItemIndex: itemIndex})
		} else this.props.toggleItemSelect(categoryIndex, itemIndex)
	}

	handleSelectQtyItem(qty) {
		let categoryIndex = this.state.categoryIndex
		let itemIndex = this.state.inputQtyItemIndex
		this.props.toggleItemSelect(categoryIndex, itemIndex, qty)
		this.setState({inputtingQty: false, inputQtyItemIndex: null})
	}

	// ---- Render ---- //

	render() {
		return (
			<div id="items-box">
				{this.state.addingItem ? this.displayAddItemForm() : null}
				{this.state.inputtingQty ? this.displayInputQtyForm() : null}
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