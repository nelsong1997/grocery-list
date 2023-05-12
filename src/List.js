import React from 'react'
import './styles.css';

class List extends React.Component {

	displayListCategories() {
		let categories = this.props.data.itemCategories
		if (!categories) return null
		let returnJSX = []

		for (let categoryIndex = 0; categoryIndex < 4; categoryIndex++) {
			let categoryObj = categories[categoryIndex]
			let categoryName = categoryObj.categoryName
			let categoryItems = categoryObj.items

			let categoryItemsJSX = []

			for (let i=0; i<categoryItems.length; i++) {
				let itemObj = categoryItems[i]
				let itemName = itemObj.itemName
				let crossedOff = itemObj.crossedOff
				let inputQty = itemObj.inputQty
				let isSelected = itemObj.selected
				let qty = ""
				let unit = ""
				if (inputQty) {
					qty = itemObj.qty
					//if there's no qty, don't display unit
					unit = qty ? itemObj.unit : ''
				}

				let crossedStyle = {}
				if (crossedOff) {
					crossedStyle = {
						color: "rgb(200,200,200)",
						textDecoration: "line-through",
						fontStyle: "italic"
					}
				}
				
				if (!isSelected) continue
				categoryItemsJSX.push(
					<label
						key={i}
						className="list-item"
						style={crossedStyle}
						onClick={()=>this.props.toggleItemCrossedOff(categoryIndex, i)}
					>{`${qty ? `${qty} ` : ``}${unit ? `${unit} ` : ``}${itemName}`}</label>
				)
			}

			if (categoryItemsJSX.length===0) {
				categoryItemsJSX.push(
					<label key="0" style={{color: "rgb(200,200,200)"}}><em>(none)</em></label>
				)
			}

			returnJSX.push(
				<div className="category-box" key={categoryIndex}>
					<div className="inner-box">
						<strong><label>{categoryName}</label></strong>
					</div>
					<div className="inner-box">
						{categoryItemsJSX}
					</div>
				</div>
			)
		}

		return returnJSX
	}

	render() {
		return (
			<div className="grid">
				{this.displayListCategories()}
			</div>
		)
	}
}

export default List;