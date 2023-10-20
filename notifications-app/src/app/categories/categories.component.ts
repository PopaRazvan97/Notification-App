import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { Category } from '../category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Output() selectCategoryEmitter = new EventEmitter<string>();
  selectedCategory: string;

  listOfCategories: Category[] = [
    { id: '1', name: 'Courses' },
    { id: '2', name: 'General' },
    { id: '3', name: 'Labs' },
  ];

  selectCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;

    this.emitSelectedCategory();
  }

  emitSelectedCategory() {
    this.selectCategoryEmitter.emit(this.selectedCategory);
  }

  resetFilters() {
    this.selectedCategory = null;
    this.emitSelectedCategory();
  }
}
