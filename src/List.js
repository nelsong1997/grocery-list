import React from 'react'
import './styles.css';

class List extends React.Component {
	constructor() {
		super()
		this.state = {
			property: "value"
		}

		this.displayListCategory = this.displayListCategory.bind(this);
	}

	displayListCategory(categoryIndex) {
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

		return (
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

	render() {
		return (
			<div id="center-box">
				<div className="grid">
					{this.displayListCategory(0)}
					{this.displayListCategory(1)}
					{this.displayListCategory(2)}
					{this.displayListCategory(3)}
				</div>
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
				"apple4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4",
				"apple4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4", "potato4", "banana4"
			]
		}
	]
}