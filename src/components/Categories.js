import React, { useState } from 'react';
import Modal from './shared/Modal'
// import {amountFormater} from '../_utils/formaters'
import axios from 'axios'

function Categories(props) {
    const [addCategory, setAddCategory] = useState(false);
    const [selectedCategoryID, setSelectedCategoryID] = useState('');
    const [categoryAmount, setCategoryAmount] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const toggleAddCategory = () => {
        setAddCategory(!addCategory)
        setSelectedCategoryID('')
        setCategoryAmount('')
        setNewCategoryName('')
    }

    const saveCategory = async () => {
        console.log('categoryAmount', categoryAmount)
        let catID = selectedCategoryID 
        if(catID === 'add new' && newCategoryName) {
            const newCategoryRes = await axios.post('/api/categories/add', {category_name: newCategoryName})
            const {category, categories} = newCategoryRes.data
            if(categories) {
                props.updateState({categories})
            }
            catID = category.category_id
        }
        const monthlyCategoriesRes = await axios.post('/api/month/'+currentMonth.month_id+'/categories/add', {category_id:catID, category_amount:categoryAmount})
        props.updateState({monthlyCategories: monthlyCategoriesRes.data})
        toggleAddCategory()
        props.recalculateMonthsAndUpdateCurrentMonth()
    }

    const {currentMonth, monthlyCategories, categories} = props
    let monthlyCats = monthlyCategories.map(mc => {
        return (
            <div style={styles.monthlyCategories} key={mc.monthly_category_id}>
                <p>{mc.category_name}</p>
                <p>${mc.category_amount}</p>
                <p>${mc.category_total}</p>
                <p>${mc.category_diff}</p>
            </div>
        )
    })
    let catOptions = [];
    categories.forEach(c => {
        const found = monthlyCategories.find(mc => mc.category_id === c.category_id)
        if(!found) {
            catOptions.push(<option value={c.category_id}>{c.category_name}</option>)

        }
    })
    return (
        <div style={{border: '1px solid gray', minHeight: '150px'}}>
            <div>
                <div style={styles.monthlyCategories}>
                    <p>Category</p>
                    <p>Amount</p>    
                    <p>Spent</p>    
                    <p>Difference</p>    
                </div>
                {monthlyCats}
            </div>
            <hr/>
            <div>
                <div style={styles.monthlyCategories}>
                    <p>Totals</p>
                    <p>${currentMonth.month_amount ? currentMonth.month_amount : '0.00'}</p>
                    <p>${currentMonth.month_total ? currentMonth.month_total : '0.00'}</p>
                    <p>${currentMonth.month_diff ? currentMonth.month_diff : '0.00'}</p>
                </div>
            </div>
            <button onClick={toggleAddCategory}>Add Category</button>
            {addCategory && (
                <Modal 
                    close={toggleAddCategory}>
                        <select name='selectedCategoryID' type='text' value={selectedCategoryID} onChange={e => setSelectedCategoryID(e.target.value)}>
                            <option value=''>Select A Category</option>
                            {catOptions}
                            <option value='add new'>Add New Category</option>
                        </select>

                    <input name='categoryAmount' type='number' value={categoryAmount} onChange={e => setCategoryAmount(e.target.value)} placeholder='Amount'/>
                    {selectedCategoryID === 'add new' && <input name='newCategoryName' type='text' value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder='New Category Name'/>}
                    <button onClick={saveCategory}>Save</button>
                </Modal>
            )}
        </div>
    );
}


// class Categories extends Component {
//     constructor() {
//         super()
//         this.state = {
//             addCategory: false,
//             selectedCategoryID: '',
//             categoryAmount: '',
//             newCategoryName: '',
//         }
//     }

//     handleInput = e => {
//         const {name, value} = e.target
//         this.setState({[name]: value})
//     }

//     toggleAddCategory = () => {
//         this.setState({addCategory: !this.state.addCategory, selectedCategoryID: '', categoryAmount: '', newCategoryName: ''})
//     }

    // saveCategory = async () => {
    //     let {selectedCategoryID, categoryAmount, newCategoryName} = this.state
    //     if(selectedCategoryID === 'add new' && newCategoryName) {
    //         const newCategoryRes = await axios.post('/api/categories/add', {category_name: newCategoryName})
    //         const {category, categories} = newCategoryRes.data
    //         if(categories) {
    //             this.props.updateState({categories})
    //         }
    //         selectedCategoryID = category.category_id
    //     }
    //     const monthlyCategoriesRes = await axios.post('/api/month/'+this.props.currentMonth.month_id+'/categories/add', {category_id:selectedCategoryID, category_amount:categoryAmount})
    //     this.props.updateState({monthlyCategories: monthlyCategoriesRes.data})
    //     this.toggleAddCategory()
    //     this.props.recalculateMonthsAndUpdateCurrentMonth()
        
    // }


//   render() {
//     const {addCategory, selectedCategoryID, categoryAmount, newCategoryName} = this.state
//     const {currentMonth, monthlyCategories, categories} = this.props
//     let monthlyCats = monthlyCategories.map(mc => {
//         return (
//             <div style={styles.monthlyCategories} key={mc.monthly_category_id}>
//                 <p>{mc.category_name}</p>
//                 <p>${mc.category_amount}</p>
//                 <p>${mc.category_total}</p>
//                 <p>${mc.category_diff}</p>
//             </div>
//         )
//     })
//     let catOptions = [];
//     categories.forEach(c => {
//         const found = monthlyCategories.find(mc => mc.category_id === c.category_id)
//         if(!found) {
//             catOptions.push(<option value={c.category_id}>{c.category_name}</option>)

//         }
//     })
//     return (
//         <div style={{border: '1px solid gray', minHeight: '150px'}}>
//             <div>
//                 <div style={styles.monthlyCategories}>
//                     <p>Category</p>
//                     <p>Amount</p>    
//                     <p>Spent</p>    
//                     <p>Difference</p>    
//                 </div>
//                 {monthlyCats}
//             </div>
//             <hr/>
//             <div>
//                 <div style={styles.monthlyCategories}>
//                     <p>Totals</p>
//                     <p>${currentMonth.month_amount ? currentMonth.month_amount : '0.00'}</p>
//                     <p>${currentMonth.month_total ? currentMonth.month_total : '0.00'}</p>
//                     <p>${currentMonth.month_diff ? currentMonth.month_diff : '0.00'}</p>
//                 </div>
//             </div>
//             <button onClick={this.toggleAddCategory}>Add Category</button>
//             {addCategory && (
//                 <Modal 
//                     close={this.toggleAddCategory}>
//                         <select name='selectedCategoryID' type='text' value={selectedCategoryID} onChange={this.handleInput}>
//                             <option value=''>Select A Category</option>
//                             {catOptions}
//                             <option value='add new'>Add New Category</option>
//                         </select>

//                     <input name='categoryAmount' type='number' value={categoryAmount} onChange={this.handleInput} placeholder='Amount'/>
//                     {selectedCategoryID === 'add new' && <input name='newCategoryName' type='text' value={newCategoryName} onChange={this.handleInput} placeholder='New Category Name'/>}
//                     <button onClick={this.saveCategory}>Save</button>
//                 </Modal>
//             )}
//         </div>
//     );
//   }
// }

let styles = {
    monthlyCategories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

export default Categories;
