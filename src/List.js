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

		for (let item of categoryItems) {
			categoryItemsJSX.push(
				<label>{item}</label>
			)
		}

		return (
			<div className="inner-box" style={{outline: "true"}}>
				<strong><label>{categoryName}</label></strong>
				{categoryItemsJSX}
			</div>
		)
	}

	render() {
		return (
			<div className="center-box">
				<div className="columns-box">
					<div className="column">
						{this.displayListCategory(0)}
						{this.displayListCategory(1)}
					</div>
					<div className="column">
						{this.displayListCategory(2)}
						{this.displayListCategory(3)}
					</div>
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
				"apple4", "banana4"
			]
		}
	]
}