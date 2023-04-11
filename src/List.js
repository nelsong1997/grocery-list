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
				if (!itemObj.selected) continue
				categoryItemsJSX.push(
					<label key={i}>{itemObj.itemName}</label>
				)
			}

			if (categoryItemsJSX.length===0) {
				categoryItemsJSX.push(
					<label key="0"><em>(none)</em></label>
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