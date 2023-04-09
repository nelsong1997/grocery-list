import React from 'react'
import './styles.css';

class List extends React.Component {
	constructor() {
		super()
		this.state = {
			property: "value"
		}

		this.displayListCategory = this.displayListCategories.bind(this);
	}

	displayListCategories() {
		let returnJSX = []

		for (let categoryIndex = 0; categoryIndex < 4; categoryIndex++) {
			let categoryObj = someData.itemCategories[categoryIndex]
			let categoryName = categoryObj.categoryName
			let categoryItems = categoryObj.items

			let categoryItemsJSX = []

			if (categoryItems.length===0) categoryItems.push("none") //need to make sure this can't be interacted with later

			for (let item of categoryItems) {
				categoryItemsJSX.push(
					<label>{item}</label>
				)
			}

			returnJSX.push(
				<div className="category-box">
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

let someData = {
	itemCategories: [
		{
			categoryName: "cat1",
			items: [
				"apple", "banana", "cheese"
			]
		},
		{
			categoryName: "cat2",
			items: [
				"apple2", "banana2"
			]
		},
		{
			categoryName: "cat3",
			items: [
				"apple3", "banana3"
			]
		},
		{
			categoryName: "cat4",
			items: [
				"apple4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4"
			]
		}
	]
}