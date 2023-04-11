import React from 'react'
import './styles.css';

class Items extends React.Component {
	constructor() {
		super()
		this.state = {
			categoryIndex: 0,
			editingCategoryName: false
		}

		this.categoryNameInput = React.createRef()

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

	handleCategoryEdit() {
		this.setState({editingCategoryName: true})
	}

	handleCategorySave() {
		this.props.saveNewCategoryName(this.state.categoryIndex, this.categoryNameInput.current.value)
		this.setState({editingCategoryName: false})
	}

	render() {
		return (
			<div>
				<div>
					{this.state.editingCategoryName ? this.displayEditCategoryInput() : this.displayCategoryDropdown()}
					<button onClick={()=>{
						this.state.editingCategoryName ? this.handleCategorySave() : this.handleCategoryEdit()
						}}>
							{this.state.editingCategoryName ? "save" : "edit"}
					</button>
				</div>
				<p>{this.state.categoryIndex}</p>
			</div>
		)
	}
}

export default Items;